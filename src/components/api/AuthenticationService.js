
import axios from 'axios';

import { API_URL } from '../../API_URL';

import UserDataService from './UserDataService';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    
    //get authentication code from username
    //change to token after testing
    executeBasicAuthenticationService(username, password) {

        //String token =credentials in ascii form
        return axios.get(`${API_URL}/basicAuth/${username}/${password}`
         /* , 
            { headers: {
                            authorization: this.createBasicAuthToken(username, password)         
                    }
            } */
        ); 
    }

    executeSignIn(username, password) {
        return axios.post(`${API_URL}/signin`, {"username": username,
                                                "password": password});
    }


    createBasicAuthToken(username, token) {
        //testing headers by using single session credentials; Must add users to a role and have them authenticated in the back
        //return 'Basic ' + window.btoa("allenfc" + ":" + "pass")

        return 'Basic ' + window.btoa(username + ":" + token);
    }
    
    registerSuccessfulLogin(username) {
        UserDataService.executeFindUserByUsername(username)
        .then(response => {
            sessionStorage.setItem('id', response.data.id);
            sessionStorage.setItem('name', response.data.name);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('email', response.data.email);
            //sessionStorage.setItem('password', response.data.password);
        })
    }

    //sign in with token
    registerSuccessfulLoginWithToken = async function (username, token) {

        //set up headers for requests
        console.log("set axios headers");
        console.log("username: " + username)
        console.log("password: " + token)
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username, token));
        //get user info
        console.log("Finding User...");
        UserDataService.executeFindUserByUsername(username)
            .then(response => {
                console.log("inside");
                console.log("Found: " + response.data.username);

                console.log("register successful");
                sessionStorage.setItem('id', response.data.id);
                sessionStorage.setItem('name', response.data.name);
                sessionStorage.setItem('username', response.data.username);
                sessionStorage.setItem('email', response.data.email);
                sessionStorage.setItem('password', response.data.password);
                console.log(response);
            })
        
        

        console.log("end");
        
    }

    //set up user for requests
     setUpAxiosInterceptors(token) {
        //let username = "allenfc";
        //let password = "pass";

        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        axios.interceptors.request.use (
            (config) => {
                config.headers.authorization = token;
                config.headers['content-type'] = 'application/json';
                console.log(config);
                
                return config;
            }, (e) => {
                console.log(e);
            }
        )
    } 

    //Helper Methods
    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        if(user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('username');
        if(user === null) return '';
        return user;
    }

    logoutCurrentUser() {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        console.log('logged out user');
    }




    //--------------JWT
    /* createJWTToken(token) {
        return 'Bearer ' + token;
    } */

    /* executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, 
        { 
            username,
            password
        });
    } */

    /* registerSuccessfulLoginForJWT(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptors(this.createJWTToken(token));
    } */
}

export default new AuthenticationService();