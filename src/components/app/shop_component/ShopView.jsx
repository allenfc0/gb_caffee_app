import React, {Component} from 'react';

import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CounterComponent from '../components/CounterComponent'
import AuthenticationService from '../../api/AuthenticationService';
import ItemDataService from '../../api/ItemDataService';

//css
import './ShopStyle.css';
import './shop-donut.jpg';

//import ItemComponent from './ItemComponent';

class ShopView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [], 
            message: null
        }

        this.getAllItems = this.getAllItems.bind(this);
    }

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

    //Navigation
    showItem(id) {
        this.props.navigate(`/order/item/${id}`);
    }

    componentDidMount() {
        this.getAllItems();
    }

    render() {
        
        return (
            <div>
                <div id="background">
                    <HeaderComponent/>

                    <div className='filter-container'>
                        
                    </div>

                    <div className='flex-container'>
                        {
                            this.state.items.map(
                                item =>
                                <button key={item.id} onClick={() => this.showItem(item.id)} className="show-item">
                                    <img src="" alt="image" className="item-image" />
                                    <div key={item.id} className="each-item">
                                        <div className="item-name">{item.name}</div>
                                        {/* <div id="item-desc">{item.description}</div> */}
                                        <div className="item-price">${item.price}</div>
                                        {/* <td><CounterComponent/></td> */}
                                    </div>
                                </button>
                                    
                                    
                            )
                        }
                    </div>
                    

                    
                </div>
                <FooterComponent/>
            </div>
            
        )
    }

    
}

export default ShopView;