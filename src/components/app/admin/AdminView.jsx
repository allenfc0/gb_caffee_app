import React, {Component} from 'react';

import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

import ItemDataService from '../../api/ItemDataService';
import JobDataService from '../../api/JobDataService';
import { Link } from 'react-router-dom';

import './AdminStyle.css';

class AdminView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            items: []
        }

        this.getAllItems = this.getAllItems.bind(this);
        this.getAllJobs = this.getAllJobs.bind(this);

        this.updateItemById = this.updateItemById.bind(this);
        this.updateJobById = this.updateJobById.bind(this);

        this.deleteItemById = this.deleteItemById.bind(this);
        this.deleteJobById = this.deleteJobById.bind(this);

        this.addItem = this.addItem.bind(this);
        this.addJob = this.addJob.bind(this);
    }

    /*
    This section will call axios requests only for ItemDataService
    */
    getAllItems() {
        //let username = AuthenticationService.getLoggedInUserName();
        ItemDataService.executeGetAllItems()
        .then(response => 
            {
                //console.log(response)
                this.setState({items: response.data})
                //console.log(this.state.items);

            })
        .catch(e => console.log(e))
    }

    deleteItemById(id) {
        ItemDataService.executeDeleteItemById(id)
        .then(response => {
            console.log(response)
            this.getAllItems();
        })
        .catch(e => console.log(e));
    }

    updateItemById(id) {
        this.props.navigate(`/item/${id}`);
    }

    addItem() {
        this.props.navigate(`/item/-1`);
    }

    /*
    This section will call axios requests only for JobDataService
    */
    getAllJobs() {
        //let username = AuthenticationService.getLoggedInUserName();
        JobDataService.executeGetAllJobs()
        .then(response => 
            {
                //console.log(response)
                this.setState({jobs: response.data})
                //console.log(this.state.items);

            })
        .catch(e => console.log(e));
    }

    deleteJobById(id) {
        JobDataService.executeDeleteJobById(id)
        .then(response => {
            console.log(response)
            this.getAllJobs();
        })
        .catch(e => console.log(e));
    }

    updateJobById(id) {
        this.props.navigate(`/job/${id}`);
    }

    addJob() {
        this.props.navigate(`/job/-1`);
    }

    componentDidMount() {
        this.getAllItems();
        this.getAllJobs();
    }

    render() {
        return(
            <div id="background">
                <HeaderComponent/>
                <div>
                    <h3 className="entity-titles">Item List</h3>
                    <table className="table">
                        <thead>
                            <tr className="table-titles">
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(
                                                    item =>
                                                        <tr key={item.id} className="each-table">
                                                            <td id="item-name">{item.name}</td>
                                                            <td id="item-desc">{item.description}</td>
                                                            <td id="item-price">${item.price}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning" 
                                                                        onClick={() => this.updateItemById(item.id)}>Edit</button>
                                                                    <button type="button" className="btn btn-danger" 
                                                                        onClick={() => this.deleteItemById(item.id)}>Delete</button><span> </span>
                                                            </td>
                                                            
                                                        </tr>
                                                    
                                            )
                            }
                                
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success" onClick={() => this.addItem()}>Add</button>
                </div>
                
                <div>
                    <h3 className="entity-titles">Jobs List</h3>
                    <table className="table">
                        <thead>
                            <tr className="table-titles">
                                <th>Job</th>
                                <th>Description</th>
                                <th>Pay / hr</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        {
                            this.state.jobs.map(
                                            job =>
                                                <tr key={job.id} className="each-table">
                                                    <td id="job-name">{job.title}</td>
                                                    <td id="job-desc">{job.description}</td>
                                                    <td id='job-pay'>{job.pay}</td>
                                                    <td>
                                                        <button className="btn btn-warning" 
                                                            onClick={() => this.updateJobById(job.id)}>Edit</button>
                                                        <button type="button" className="btn btn-danger"
                                                            onClick={() => this.deleteJobById(job.id)}>Delete</button><span> </span>
                                                        
                                                    </td>
                                                </tr>
                                                
                                        )
                        }
                                
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success" onClick={() => this.addJob()} >Add</button>
                </div>

            </div>
        );
    }
}


export default AdminView;