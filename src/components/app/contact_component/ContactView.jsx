//react
import React, {Component} from 'react';
// eslint-disable-next-line
import { Formik } from 'formik';
//custom components
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

//css
import './ContactStyle.css';

class ContactView extends Component {
    render() {
        return(
            <div>
                <div id="background">
                    <HeaderComponent/>
                    <div className="content">
                        <h1 id="site-title">Contact Us</h1>
                        <p id="site-desc">
                            Maecenas non justo condimentum, faucibus arcu quis, tempor mi. 
                            Maecenas molestie egestas velit, quis tristique ipsum elementum a. In at sollicitudin leo. 
                            Proin neque nisi, aliquam posuere pellentesque eget, iaculis consectetur metus. 
                            Vivamus scelerisque tortor volutpat orci faucibus rhoncus. Nullam pretium ante ac tincidunt posuere. 
                            Morbi rutrum ultrices ipsum at porttitor. Donec eu tellus massa. In fringilla tincidunt leo in suscipit.
                        </p>

                        <div className="contact">
                            <div className="contact-info">
                                <h2 className="contact-header">Call Us</h2>
                                <a href="tel:9999999999">(999) 999-999</a>
                            </div>
                            <div className='contact-info'>
                                <h2 className='contact-header'>Send Us An Email</h2>
                                <a href="mailto:gbcustomerservice@gmail.com">gbcustomerservice@gmail.com</a>
                            </div>
                            <br/>
                            
                            {/* <form>
                                <fieldset id="email-info">
                                    <legend><h2 class="contact-header">Send us an email</h2></legend>
                                    <div id="all-inputs">
                                        <label for="email" class="email-input">Email</label>
                                        <input type="text" placeholder="Enter your email" id="email" name="email"/>
                                        
                                        <label for="title" class="email-input">Title</label>
                                        <input type="text" placeholder="Enter title" id="title" name="title"/>
                                        
                                        <label for="message" class="email-input">Enter message</label>
                                        <input type="text" placeholder="Enter message" id="message" name="message"/>

                                        <input type="submit"/>
                                    </div>
                                    
                                </fieldset>
                                
                            </form> */}
                        </div>

                    </div>
                    
                    
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default ContactView;