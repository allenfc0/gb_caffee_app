import React, {Component} from 'react';
import CartDataService from '../../api/CartDataService';

class CounterComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        }
        
        //this.change = this.change.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.addOrderToUserCart = this.addOrderToUserCart.bind(this);
    }
    
    //method will increment or decrement
    increment(by) {
        this.setState((prevState) => {
            return {counter: prevState.counter + by}
        });
    }

    decrement(by) {
    if(this.state.counter > 0) {
        this.setState((prevState) => {
            return {counter: prevState.counter - by}
        });
    }
    return 0;
        
    }

    onInputChange(event) {
        this.setState( {
            [event.target.name]: event.target.value
        });
    }


    //data service
    addOrderToUserCart() {
        let user = {
            id: sessionStorage.getItem('id'),
            name: sessionStorage.getItem('name'),
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password'),
        }
        let cart = {
            user: user,
            item: this.props.item,
            quantity: this.state.counter,
            amount: (this.props.item.price) * (this.state.counter),
            submitted: false
        };

        console.log(cart);

        CartDataService.executeCreateOrder(cart)
        .then(() => { 
                        //console.log(this.state.counter);
                        this.props.navigate(`/shop/${sessionStorage.getItem('username')}`)
                    }
            )
        .catch((e) => {console.log(e)}
            );
            console.log("end of add");
    }

    componentDidMount() {
        console.log(sessionStorage);
        console.log(this.props.item);
    }

    render() {
        return(
            <div>
                <div>
                    <div className="counter">
                        <button className="counter-button" by={1} onClick={() => this.decrement(this.props.by)}>-</button>
                        <input type="text" className="counter-text" id="amount-value" value={this.state.counter} onChange={this.onInputChange}/>
                        {/* <span>{this.state.counter}</span> */}
                        <button className="counter-button" by={1} onClick={() => this.increment(this.props.by)}>+</button>

                        <button className="btn btn-success" id="btn-add" onClick={this.addOrderToUserCart}>Add</button>
                    </div>
                </div>
                
                
            </div>
        );
    }

    

}

CounterComponent.defaultProps = {
    by: 1,
    item: {
        id: 0,
        name: '',
        desc: '',
        price: 0
    }
}

CounterComponent.protoTypes = {
    //by: PropTypes.number
}

export default CounterComponent;