import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ItemDataService from '../../api/ItemDataService.js';
import AuthenticationService from '../../api/AuthenticationService.js';

class ItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id, name, description, price
            
            id: this.props.params.id,
            name: '',
            description: '',
            price: 0

        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(values) {
        let errors = {};
        if(!values.name) {
            errors.name = "Enter a name"
        } 
        if(!values.description) {
            errors.description = "Enter a description"
        } else if(values.description.length < 4) {
            errors.description = "Description should have at least 4 characters";
        }
        if(!values.price) {
            errors.price = "Enter a price"
        }
        return errors;
    }

    onSubmit(values) {
        console.log(values);
        let item = {
            id: this.state.id,
            name: values.name,
            description: values.description,
            price: values.price
        };
        console.log(item.id);

        let admin = AuthenticationService.getLoggedInUserName();

        if(this.state.id === 0) {
            ItemDataService.executeCreateItem(item)
            .then(() => this.props.navigate(`/${admin}-admin`))
            .catch((e) => console.log(e));
        } else {
            ItemDataService.executeUpdateItem(item.id, item)
            .then(() => this.props.navigate(`/${admin}-admin`))
            .catch((e) => console.log(e));
        }

    }

    componentDidMount() {
        console.log(`working on id: ${this.state.id} `);
        if(this.state.id == 0) {
            return
        }

        ItemDataService.executeFindItemById(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
                description: response.data.description,
                price: response.data.price
            }));
        
    }

    render() {
        let {name, description, price} = this.state;

        /*value will be for enabling or disabling 'enableReinitialize'*/
        let reinitialize = true;
        if(this.state.id == -1) reinitialize = false;
        console.log(this.state.id + " " + reinitialize)
        return(
            <div>
                <h1>Item</h1>
                <div className="container">
                    <Formik
                        initialValues={{ name, description, price}}
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
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field className="form-control" type="text" name="price" />
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

export default ItemComponent;