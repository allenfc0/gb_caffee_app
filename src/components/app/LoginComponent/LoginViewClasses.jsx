//react
import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//router
//import {useNavigate} from 'react-router-dom';

import AuthenticationService from '../../api/AuthenticationService.js';

//style
import './LoginView.css'

class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            username: '',
            email: '',
            password: ''
        }
        //this.findPasswordByUsername = this.findPasswordByUsername.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
            //username: values.username,
            //password: values.password
        }) 
        console.log(this.state.username + " a " + this.state.password);
    }

    onSub() {

        /* if(this.state.username === "allenfc" && this.state.password === "pass") {
            //console.log("regular user signed in");
            AuthenticationService.registerSuccessfulLogin(this.state.username, "password");
            this.props.navigate(`/home/${this.state.username}`);
    
        } 
        else if(this.state.username === 'admin' && this.state.password === "pass") {
            AuthenticationService.registerSuccessfulLogin(this.state.username, "password");
            this.props.navigate(`/${this.state.username}-admin`);
        }  */


        //post request to backend
        /* AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
                .then((response) => {
                    AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);
                    this.props.navigate(`/home/${this.state.username}`);
                }).catch((e) => {
                    console.log(e);
                    this.setState({showSuccessMessage: false});
                    this.setState({hasLoginFailed: true})
                }); */
        return;
                
    }

    onSubmit = async function (e) {
        //e.preventDefault();
        try {

            //for spring security w/o JWT
            //awaits prevents from userdata from displaying as soon as the page switches
            AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
                .then((response) => {
                    console.log(response.data);
                    
                    //check if username and password are correct
                    if(response.data.status === 200) {
                        //AuthenticationService.executeSignIn();
                        AuthenticationService.registerSuccessfulLogin(this.state.username);
                        this.props.navigate(`/home/${this.state.username}`);
                        
                    }
                    
                    
                }).catch((e) => {
                    console.log(e);
                    //this.setState({showSuccessMessage: false});
                    //this.setState({hasLoginFailed: true})
                });
        } catch (err) {
            console.log(err?.response);
        }
    }

    validate(values) {
        let errors = {};
        if(!values.username) {
            errors.username = "Enter a username";
        } else if(!values.password) {
            errors.password = "Enter a password";
        }
        console.log(errors);
        return errors;
    }

    componentDidMount() {
        
    }

    render() {
        let username = this.state.username;
        let password = this.state.password;
        return (
            <div className="flex-container">
                <Formik
                    initialValues={{username, password}}
                    onSubmit={this.onSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                    validate={this.validate}
                    enableReinitialize={false}
                    className="content-container">
                    
                    <Form onChange={this.onChange} className="form-container">
                        <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                        <ErrorMessage name="password" component="div" className="alert alert-warning"/>

                        <h2 className='account-login'>Login</h2>
                        <br /><br />
                        <span className='label'>USER NAME:</span>
                        <br />
                        <Field className="text-input" type="text" name="username" />
                        <br />
                        {/* <input className='text-input' type="text" name="username" /> */}
                        <br />
                        <span className='label'>PASSWORD:</span>
                        <br />
                        <Field className="text-input" type="text" name="password"  />
                        <br />
                        {/* <input type="text" className='text-input' name='password' /> */}
                        <br /><br />
                        <button className="btn btn-success" type="submit">Login</button>
                    </Form>

                            
                    
                        
                </Formik>
                
            </div>
            
            
        );
    }
}


export default LoginView;