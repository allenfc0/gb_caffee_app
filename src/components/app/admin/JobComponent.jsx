import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import JobDataService from '../../api/JobDataService.js';
import AuthenticationService from '../../api/AuthenticationService.js';
class JobComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id, title, description, pay
            
            id: this.props.params.id,
            title: '',
            description: '',
            pay: 0
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        
    }

    validate(values) {
        let errors = {};
        if(!values.title) {
            errors.title = "Enter a title"
        } 
        if(!values.description) {
            errors.description = "Enter a description"
        } else if(values.description.length < 4) {
            errors.description = "Description should have at least 5 characters";
        }
        if(!values.pay) {
            errors.pay = "Enter an amount"
        } 

        return errors;
    }

    onSubmit(values) {
        console.log(values);
        let job = {
            id: this.state.id,
            title: values.title,
            description: values.description,
            pay: values.pay
        };
        console.log(job.id);

        let admin = AuthenticationService.getLoggedInUserName();

        if(this.state.id === 0) {
            JobDataService.executeCreateJob(job)
            .then(() => this.props.navigate(`/${admin}-admin`))
            .catch((e) => console.log(e));
        } else {
            JobDataService.executeUpdateJob(job.id, job)
            .then(() => this.props.navigate(`/${admin}-admin`))
            .catch((e) => console.log(e));
        }

    }

    componentDidMount() {
        console.log(`working on id: ${this.state.id} `);
        if(this.state.id === 0) {
            return
        }

        JobDataService.executeFindJobById(this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                description: response.data.description,
                pay: response.data.pay
            }));

    }

    render() {
        let {title, description, pay} = this.state;

        /*value will be for enabling or disabling 'enableReinitialize'*/
        let reinitialize = true;
        if(this.state.id == -1) reinitialize = false;
        console.log(this.state.id + " " + reinitialize)
        return(
            <div>
                <h1>Job</h1>
                <div className="container">
                    <Formik
                        initialValues={{ title, description, pay}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        //changes if the id is equal to 0
                        enableReinitialize={reinitialize}
                    >

                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />

                                    <fieldset className="form-group">
                                        <label>Title</label>
                                        <Field className="form-control" type="text" name="title"></Field>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Pay</label>
                                        <Field className="form-control" type="text" name="pay"></Field>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default JobComponent;