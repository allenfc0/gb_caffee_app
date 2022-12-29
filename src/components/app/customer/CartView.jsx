import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import CartDataService from '../../api/CartDataService';
import UserDataService from '../../api/UserDataService';
import AuthenticationService from '../../api/AuthenticationService';

import HeaderComponent from '../components/HeaderComponent';

import './ProfileStyle.css'

class CartView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
        this.getCartByUserId = this.getCartByUserId.bind(this);
        this.deleteOrderById = this.deleteOrderById.bind(this);
        this.submitOrderToShop = this.submitOrderToShop.bind(this);
    }

    getCartByUserId(id) {
        CartDataService.executeFindCartListByUserId(id)
            .then(response => {
                this.setState({
                    orders: response.data
                });
                console.log(response.data)
            }
        )
    }

    deleteOrderById(id) {
        CartDataService.executeDeleteCartById(id)
            .then(response => {
                console.log(response);
                this.getCartByUserId(sessionStorage.getItem('id'));
            })
            .catch(e => console.log(e));
    }

    submitOrderToShop() {
        let orders = this.state.orders;
        console.log(orders)
        orders.forEach(order => {
            order['submitted'] = true;
            //TESTING
            console.log(`CART ID: ${order.id}\nSUBMITTED CART: ${order.submitted}`);

            
            CartDataService.executeUpdateCartById(order.id, order)
                .then(response => {
                    console.log(response.status);
                    this.getCartByUserId(sessionStorage.getItem('id'));
                })
                .catch(e => console.log(e));
        });
        
    }

    componentDidMount() {
        
        //this.getUserIdByUsername(AuthenticationService.getLoggedInUserName());
        this.getCartByUserId(sessionStorage.getItem('id'));

    }

    render() {
        return(
            <div id="background">
                <HeaderComponent />
                <div className='order-divider'>
                    <h3>Orders</h3>
                    <table className='table'>
                        <thead>
                            <tr className='table-titles'>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                                    order =>
                                                        !order.submitted && <tr key={order.id} className='each-table'>
                                                            <td id=''>{order.item.name}</td>
                                                            <td>{order.quantity}</td>
                                                            <td>{order.amount}</td>
                                                            <td>
                                                                <button type='button' className='btn btn-danger'
                                                                onClick={() => this.deleteOrderById(order.id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                )
                            }
                            
                        </tbody>

                    </table>
                    <div className='actions'>
                        <Link to={`/shop/${AuthenticationService.getLoggedInUserName()}`} id='black-btn'>Back to Shop</Link>
                        <button type='submit' id="black-btn" onClick={() => this.submitOrderToShop()}>Pay Now</button>
                    </div>
                    

                </div>
                <div className='order-divider'>
                    <h3>Submitted Orders</h3>
                    <table className='table'>
                        <thead>
                            <tr className='table-titles'>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                                    order =>
                                                        order.submitted && <tr key={order.id} className='each-table'>
                                                            <td id=''>{order.item.name}</td>
                                                            <td>{order.quantity}</td>
                                                            <td>{order.amount}</td>
                                                            <td>IN PROGRESS</td>
                                                        </tr>
                                )
                            }
                            
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    
}

export default CartView;