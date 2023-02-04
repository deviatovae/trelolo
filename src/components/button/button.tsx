import React from 'react';
import './button.scss';
import { FormattedMessage } from 'react-intl';
import { ButtonProp } from '../types/ButtonsProp';

export default function Button({ isRound, children, id, onclick }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass}`;

    return (
    <button className={classes} onClick={onclick}>{children}{ <FormattedMessage id={id} /> }</button>
    );
}

Button.defaultProps = {
    isRound: false
};
