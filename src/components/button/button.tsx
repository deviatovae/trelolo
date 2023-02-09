import './button.scss';
import React, { ReactNode } from 'react';

interface ButtonProp {
    isRound: boolean,
    children: ReactNode,
    onClick?: React.MouseEventHandler,
    className?: string,
    bgColor?: string,
}

export default function Button({ isRound, children, onClick, className, bgColor }: ButtonProp) {
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
    >{children}</button>;
}

Button.defaultProps = {
    isRound: false,
};
