import React, { Component } from 'react';

import UserDataService from '../../api/UserDataService';
import AuthenticationService from '../../api/AuthenticationService';

import { Link } from 'react-router-dom';

import HeaderComponent from '../components/HeaderComponent';

import './ProfileStyle.css'

class ProfileView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            username: '',
            email: '',
            password: ''
        }

        this.getUserByUsername = this.getUserByUsername.bind(this);
    }

    getUserByUsername(username) {
        UserDataService.executeFindUserByUsername(username)
        .then(response => this.setState({
            name: response.data.name,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password
        }))
    }

    componentDidMount() {
        this.getUserByUsername(AuthenticationService.getLoggedInUserName());
    }

    render() {
        return(
            <div>
                <div id='background'>
                    <HeaderComponent/>
                    <h2>Profile</h2>
                    <div id='profile-container'>
                        <div id='name'>Name: {this.state.name}</div>
                        <div id='username'>Username: {this.state.username}</div>
                        <div id='email'>Email: {this.state.email}</div>
                    </div>

                    <div id='orders-link'>
                        <Link to={`/profile/${this.state.username}/cart`} id='black-btn'>Orders</Link>
                    </div>
                </div>
                

            </div>
        );
    }
}

export default ProfileView;