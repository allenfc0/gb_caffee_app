//react
import React, {Component} from 'react';

//custom components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import JobDataService from '../../api/JobDataService';

//css
import './JobStyle.css';

class JobsView extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            jobs: [],
            message: null
        });

        this.getAllJobs = this.getAllJobs.bind(this);
    }

    getAllJobs() {
        JobDataService.executeGetAllJobs()
        .then(response => {
            this.setState({
                jobs: response.data
            })
        })
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.getAllJobs();
    }

    render() {
        return(
            <div>
                <div id="background">
                    <HeaderComponent/>
                    <div className="content">
                        <h1 id="site-title">Jobs</h1>
                        <p id="site-desc">
                            In vitae odio viverra, placerat tortor sit amet, maximus ligula. Fusce ultricies eros metus, eget pharetra odio scelerisque a. 
                            Cras tincidunt ex non magna pellentesque euismod. Pellentesque a massa tristique, tristique sapien efficitur, tristique ante. 
                            Mauris risus arcu, auctor sed eleifend vitae, porttitor at diam. Maecenas non justo condimentum, faucibus arcu quis, tempor mi. 
                            Maecenas molestie egestas velit, quis tristique ipsum elementum a. In at sollicitudin leo. 
                            Proin neque nisi, aliquam posuere pellentesque eget, iaculis consectetur metus. 
                            Vivamus scelerisque tortor volutpat orci faucibus rhoncus. Nullam pretium ante ac tincidunt posuere. 
                            Morbi rutrum ultrices ipsum at porttitor. Donec eu tellus massa. In fringilla tincidunt leo in suscipit.
                        </p>
                        <table id="job-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Pay (hourly)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.jobs.map(
                                        job => 
                                            <tr key={job.id}>
                                                <td>{job.title}</td>
                                                <td>{job.description}</td>
                                                <td>{job.pay}</td>
                                            </tr>
                                    )
                                    
                                }
                            </tbody>
                            
                        </table>
                    </div>
                
                </div>
                <FooterComponent/>
            </div>
            
        );
    }
}

export default JobsView;