//react
import React, {Component} from 'react'; 

//router
import {Link} from 'react-router-dom';
import AuthenticationService from '../../api/AuthenticationService';
import UserDataService from '../../api/UserDataService';

class HeaderComponentClass extends Component {
    /* 
    constructor() {
        super();
        
        this.state = {
            name: ''
        }
    }
    
    getNameByUsername(username) {
        UserDataService.executeFindUserByUsername(username)
        .then(response => {
            this.setState({
                name: response.data.name
            });
        })
        .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.setState({
            //name: this.getNameByUsername(AuthenticationService.getLoggedInUserName())
        });
        

    }
     */
    

    render() {

        //changed when Authentication method is done
        let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        let getLoggedInUserName = AuthenticationService.getLoggedInUserName();
        
        return (
            <div className="header">
                {/* navigation for phones is broken */}
                <input type="checkbox" id="check"/>
                <div className="nav-links">
                    {<Link className='' to={`/home/${getLoggedInUserName}`}>Home</Link>}
                    {/* take out 'about', 'jobs', 'contact'  */}
                    {/* <Link className='' to={`/about/${getLoggedInUserName}`}>About</Link>
                    <Link className='' to={`/jobs/${getLoggedInUserName}`}>Jobs</Link>
                    <Link className='' to={`/contact/${getLoggedInUserName}`}>Contact</Link> */}
                    
                    {!isUserLoggedIn && <Link className='' to="/login">Log in</Link>}
                    {!isUserLoggedIn && <Link className='' to="/signup">Sign up</Link>}
                    {isUserLoggedIn && <Link className='' to={`/profile/${getLoggedInUserName}`}>Profile</Link>}
                    {isUserLoggedIn && <Link className='' to={`/shop/${getLoggedInUserName}`}>Shop</Link>}
                    {isUserLoggedIn && <Link className='' to={`/profile/${getLoggedInUserName}/cart`}>Orders</Link>}
                    {isUserLoggedIn && <Link className='' to="/home" onClick={AuthenticationService.logoutCurrentUser}>Log out</Link>}
                </div>

                <div className='display-name'>
                    {isUserLoggedIn && <h1>Welcome {sessionStorage.getItem('name')}</h1>}
                </div>

                

                {/* <label for="check"> */}
                {/* <label>
                    <i className="fas fa-bars menu-btn"></i>
                    <i className="fas fa-times close-btn"></i>
                </label> */}

            </div>
        );
    }
}


export default HeaderComponentClass;
