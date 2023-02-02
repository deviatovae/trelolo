import React from 'react';
import './button.scss';

interface ButtonProp {
    isRound: boolean,
    children: string,
    onclick?: React.MouseEventHandler
}

export default function Button({ isRound, children, onclick }: ButtonProp) {
    const roundClass = isRound ? 'round' : '';
    const classes = `button ${roundClass}`;

    return <button className={classes} onClick={onclick}>{children}</button>;
}

Button.defaultProps = {
    isRound: false
};
