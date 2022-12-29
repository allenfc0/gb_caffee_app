//react
import React, { Component } from 'react';

//routing and authentication
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthenticatedRoute from './router/AuthenticatedRoute';

//custom components
import HomeComponent from './HomeView';
import AboutComponent from './AboutView';
import JobsComponent from './job_component/JobsView';
import ContactComponent from './contact_component/ContactView';
import LoginView from './LoginComponent/LoginView'
import SignupView from './SignupComponent/SignupView';
import ShopComponent from "./shop_component/ShopView";
import CartView from "./customer/CartView.jsx"

//admin and user profiles
import AdminComponent from './admin/AdminView';
import ProfileComponent from './customer/ProfileView';

//adding entities
import ItemComponent from './admin/ItemComponent';
import JobComponent from './admin/JobComponent';
import ShopItemComponent from './shop_component/ShopItemComponent';

//handling error pages
import ErrorComponent from "./ErrorView";

//Navigation & Parameters using Hooks
import withNavigation from './router/WithNavigation';
import withParams from './router/WithParams';
import CounterComponent from './components/CounterComponent';



class WebApp extends Component {
    render() {

        const LoginViewWithParamsAndNavigation = withParams(withNavigation(LoginView));
        const SignupViewWithParamsAndNavigation = withParams(withNavigation(SignupView));
        const AdminComponentWithNavigation = withNavigation(AdminComponent);
        const ItemComponentWithParamsAndNavigation = withParams(withNavigation(ItemComponent));
        const JobComponentWithParamsAndNavigation = withParams(withNavigation(JobComponent));
        const ShopComponentWithParamsAndNavigation = withParams(withNavigation(ShopComponent));
        const ShopItemComponentWithParamsAndNavigation = withParams(withNavigation(ShopItemComponent));
        
        const ProfileViewWithParamsAndNavigation = withParams(withNavigation(ProfileComponent));

        return (
            <div className="WebApp">
                {/* these are all routes possible */}
                <Router>
                    <Routes>
                        
                                <Route path="/" element={<HomeComponent/>}/>

                                <Route path="/home" element={<HomeComponent/>}/>
                                <Route path="/home/:name" element={<HomeComponent/>}/>

                                <Route path="/about" element={<AboutComponent/>}/>
                                
                                <Route path="/jobs" element={<JobsComponent/>}/>

                                <Route path="/contact" element={<ContactComponent/>}/>
                                <Route path="/contact/:name" element={<ContactComponent/>}/>
                                
                                {/* needs work with paths */}
                                <Route path="/shop" element={<ShopComponentWithParamsAndNavigation/>}></Route>
                                <Route path="/shop/:name" element={<ShopComponentWithParamsAndNavigation/>}></Route>

                                <Route path="/order/item/:id" element={<ShopItemComponentWithParamsAndNavigation/>}></Route>
                                
                                <Route path="profile/:name" element={<ProfileViewWithParamsAndNavigation/>}></Route>
                                <Route path="profile/:name/cart" element={<CartView/>}></Route>

                                <Route path="/login" element={<LoginViewWithParamsAndNavigation />}></Route>
                                <Route path="/signup" element={<SignupViewWithParamsAndNavigation/>}></Route>

                                {/* needs work with paths */}
                                <Route path='/:name-admin' element={<AuthenticatedRoute><AdminComponentWithNavigation/></AuthenticatedRoute>}></Route>
                                <Route path="/add-item" element={<AuthenticatedRoute><AdminComponentWithNavigation /></AuthenticatedRoute>} ></Route>
                                <Route path="/item/:id" element={<AuthenticatedRoute><ItemComponentWithParamsAndNavigation /></AuthenticatedRoute>} ></Route>
                                <Route path="/job/:id" element={<AuthenticatedRoute><JobComponentWithParamsAndNavigation /></AuthenticatedRoute>}></Route>


                                <Route path="*" element={<ErrorComponent/>}/>
                        
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default WebApp