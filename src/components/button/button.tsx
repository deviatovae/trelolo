import './button.scss';
import React, { ReactNode } from 'react';

interface ButtonProp {
    id?: string
    isRound: boolean,
    children: ReactNode,
    onClick?: React.MouseEventHandler,
    className?: string,
    bgColor?: string,
    disabled?: boolean
    isLoading?: boolean
}

export default function Button({ id, isRound, children, onClick, className, bgColor, disabled, isLoading }: ButtonProp) {
    const roundClass = isRound ? 'button_round' : '';
    const classes = `button ${roundClass} ${className} ${isLoading}`;
    const styles: React.CSSProperties = {};
    if (bgColor) {
        styles.backgroundColor = bgColor;
    }

    return <button
      id={id}
      className={classes}
      onClick={onClick}
      style={styles}
      disabled={disabled || isLoading}
    >{children}
        {isLoading && <span className="button__loading"></span>}
    </button>;
}

Button.defaultProps = {
    isRound: false,
    isLoading: false,
};
