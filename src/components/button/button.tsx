import React, { ReactElement } from 'react';
import './button.scss';

interface ButtonProp {
    isRound: boolean,
    children: ReactElement | string,
    onClick?: React.MouseEventHandler,
    className?: string,
}

export default function Button({ isRound, children, onClick, className }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass} ${className}`;

    return <button className={classes} onClick={onClick}>{children}</button>;
}

Button.defaultProps = {
    isRound: false,
};
