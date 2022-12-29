//react
import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import AuthenticationService from '../../api/AuthenticationService.js';

//import {useNavigate} from "react-router-dom";

//style
import './LoginView.css';

const LoginView = ({navigate}) => {
    //state hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    //const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            //for spring security w/o JWT
            //awaits prevents from userdata from displaying as soon as the page switches
            AuthenticationService.executeBasicAuthenticationService(username, password)
                    .then((response) => {
                        console.log(response.data);
                        
                        //check if username and password are correct
                        if(response.data.status === 200) {
                            //AuthenticationService.executeSignIn();
                            AuthenticationService.registerSuccessfulLogin(username);
                            
                            setTimeout(() => {
                                setIsPending(false);
                                navigate(`/home/${username}`);
                            }, 2000);
                            
                            
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

    

    return ( 
        
        <div className="flex-container">
                <form onSubmit={onSubmit} className="form-container">
                    <h2 className='account-login'>Login</h2>
                    <br /><br />
                    <span className='label'>USER NAME:</span>
                    <br />
                    <input type="text" className='text-input' required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <span className='label'>PASSWORD:</span>
                    <br />
                    <input type="text" className='text-input' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
                    {!isPending && <button className="btn btn-success" type="submit">Login</button>}
                    {isPending && <button className="btn btn-success" type="submit">Wait. . .</button>}

                </form>
                
            </div>
     );
}
 
export default LoginView;