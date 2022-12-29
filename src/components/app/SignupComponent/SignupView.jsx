//react
import React, {Component} from 'react';

//Forms
import {Formik, Form, Field, ErrorMessage} from 'formik'

//router
import UserDataService from '../../api/UserDataService.js';


//style
import './SignupView.css'

class SignupView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            username: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = async function () {
        let newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        try {
            await UserDataService.executeCreateUser(newUser);
            this.props.navigate(`/login`);
        } catch(err) {
            console.log(err);
        }
    }

    validate(values) {
        let errors = {};
        
        if(!values.name) {
            errors.name = "Enter a name";
        } else if(!values.username) {
            errors.username = "Enter a username";
            console.log(errors.username);
        } else if(!values.email) {
            errors.email = "Enter an email";
        } else if(!values.password) {
            errors.password = "Enter a password";
        }
        return errors;
    }

    componentDidMount() {

    }

    render() {
        let name = this.state.name;
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;

        return (
            
                <div className='flex-container'>
                    
                    <Formik
                        initialValues={{name, username, email, password}}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={false}
                        >
                        <Form onChange={this.onChange} className="form-container">
                            <ErrorMessage name="name" component="div" className="alert alert-warning" />
                            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="email" component="div" className='alert alert-warning' />
                            <ErrorMessage name="password" component="div" className='alert alert-warning' />
                            
                            <h2 className='account-signup'>Sign Up</h2>
                            <br /><br />
                            <span className='label'>NAME:</span>
                            <br />
                            <Field className="text-input" type="text" name="name" /> 
                            <br />
                            
                            <span className='label'>USER NAME:</span>
                            <br />
                            <Field className="text-input" type="text" name="username" />
                            <br />

                            
                            <span className='label'>EMAIL:</span>
                            <br />
                            <Field className="text-input" type="text" name="email"/>
                            <br />

                            
                            <span className='label'>PASSWORD:</span>
                            <br />
                            <Field className="text-input" type="text" name="password"/>
                            <br /><br />

                            <button className="btn btn-success" type="submit">Submit</button>
                        </Form>
                    </Formik>
                
                </div>
            
            
        );
    }
}


export default SignupView;