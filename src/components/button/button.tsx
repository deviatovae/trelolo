import React from 'react';
import './button.scss';

interface ButtonProp {
    isRound: boolean,
    children: string,
    onclick?: React.MouseEventHandler,
    className?: string,
}

export default function Button({ isRound, children, onclick, className }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass} ${className}`;
    return <button className={classes} onClick={onclick}>{children}</button>;
}

Button.defaultProps = {
    isRound: false,
};