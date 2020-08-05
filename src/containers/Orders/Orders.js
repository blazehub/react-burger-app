import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import Order from '../../components/Order/Order/Order';

import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading)
            orders = this.props.orders.map(order => <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price || 0} />)

        return orders;
    }
}

const mapPropsToState = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(Orders);
