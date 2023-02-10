import './button.scss';
import React, { ReactNode } from 'react';

interface ButtonProp {
    isRound: boolean,
    children: ReactNode,
    onClick?: React.MouseEventHandler,
    className?: string,
    bgColor?: string,
    disabled?: boolean
}

export default function Button({ isRound, children, onClick, className, bgColor, disabled }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass} ${className}`;
    const styles: React.CSSProperties = {};
    if (bgColor) {
        styles.backgroundColor = bgColor;
    }

    return <button
        className={classes}
        onClick={onClick}
        style={styles}
        disabled={disabled}
    >{children}</button>;
}

Button.defaultProps = {
    isRound: false,
};
