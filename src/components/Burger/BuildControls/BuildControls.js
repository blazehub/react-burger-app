import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: "salad" },
    { label: 'Bacon', type: "bacon" },
    { label: 'Cheese', type: "cheese" },
    { label: 'Souce', type: "souce" }
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price:<strong>{props.price}</strong></p>
            {controls.map((ctrl, index) => (
                <BuildControl key={ctrl.type + index} label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
        </div>
    )
}

export default BuildControls;