import React from 'react';
import './button.scss';
import { ButtonProp } from '../types/ButtonsProp';

export default function Button({ isRound, children, onclick }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass}`;

    return (
    <button className={classes} onClick={onclick}>{children}</button>
    );
}

Button.defaultProps = {
    isRound: false
};
