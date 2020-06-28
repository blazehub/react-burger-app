import React, { Component } from 'react';

import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

export class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (ev) => {
        ev.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Avinash Thakur",
                address: {
                    street: 'Test Street 1',
                    postalCode: '343344'
                }
            }
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
            <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
