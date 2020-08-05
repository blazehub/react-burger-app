import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import * as actions from '../../store/actions';

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase();
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data'
        });
    }

    render() {

        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={() => this.checkoutCancelHandler()}
                    checkoutContinued={() => this.checkoutContinueHandler()} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
            </div>;
        }

        return summary;
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});

const mapDispatchToProps = (dispatch) => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
