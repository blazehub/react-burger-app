import React, { Component } from "react";

import { connect } from 'react-redux';

import Aux from './../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as burgerBuilderAction from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => (sum + el), 0);
        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({ pathname: '/checkout' });
    }


    render() {

        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null

        let burger = <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseConitnued={this.purchaseContinueHandler}
                price={this.props.price}
                ingredients={this.props.ings} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);