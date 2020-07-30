import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data'
        });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={() => this.checkoutCancelHandler()}
                    checkoutContinued={() => this.checkoutContinueHandler()} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ings: state.ingredients
});

export default connect(mapStateToProps)(Checkout);
