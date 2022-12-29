import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './FooterStyle.css';
class FooterComponent extends Component {
    render() {
        return(
            <div id='info-flex'>
                <div id="about-company">
                    <h5>About Company</h5>
                    <div id="about-company-links">
                        <Link to={`/about`} className="iLink">About</Link>
                        <Link to={`/jobs`} className="iLink">Jobs</Link>
                        <Link to={`/contact`} className="iLink">Contact</Link>
                    </div>
                    
                </div>

                <div id="follow">
                        <h5>Follow us!</h5>
                        <div className="media-icons">
                            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                        </div> 
                </div>
            </div>
            
        );
    }
}

export default FooterComponent