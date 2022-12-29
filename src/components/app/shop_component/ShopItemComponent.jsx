
//react
import React, {Component} from 'react';

//api
import ItemDataService from '../../api/ItemDataService';
import HeaderComponent from '../components/HeaderComponent';
import Counter from '../components/CounterComponent';

import withParams from '../router/WithParams';
import withNavigation from '../router/WithNavigation';

class ShopItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            name: '',
            desc: '',
            price: 0
        }

        this.getItemById = this.getItemById.bind(this);

    }

    getItemById() {
        ItemDataService.executeFindItemById(this.state.id)
        .then(response => {
            this.setState ({
                name: response.data.name,
                desc: response.data.description,
                price: response.data.price
        });
            //console.log(this.state.name);
        })
        .catch(e => console.log(`error: ${e}`))
    }

    componentDidMount() {
        this.getItemById()
        //console.log(this.state.id);
    }

    render() {

        const CounterWithNavigation = withNavigation(Counter);

        return(
            <div id="background">
                <HeaderComponent/>
                <div id="container-flex">
                    <img alt="" id='img-canvas'/>
                    <div id='item-info-flex'>
                        <div className='item-name'>{this.state.name}</div>
                        <div className='item-desc'>{this.state.desc}</div>
                        <div className='item-price'>{this.state.price}</div>
                        
                        <CounterWithNavigation item={this.state} />
                    </div>
                </div>
            </div>
        )
    }
}


export default ShopItemComponent;