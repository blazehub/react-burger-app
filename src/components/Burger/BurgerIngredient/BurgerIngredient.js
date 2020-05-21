import React, { Component } from 'react';
import PropsTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {


    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seed1}></div>
                        <div className={classes.Seed2}></div>
                    </div>
                );
                break;
            case ('souce'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropsTypes.string.isRequired
};


export default BurgerIngredient;