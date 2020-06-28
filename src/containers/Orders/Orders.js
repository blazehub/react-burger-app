import React, { Component } from 'react';
import axios from '../../axios-order';

import Order from '../../components/Order/Order/Order';

export class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                this.setState({ loading: false, orders: Object.keys(res.data).map(k => ({ ...res.data[k], id: k })) });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price || 0} />)}
            </div>
        )
    }
}

export default Orders;
