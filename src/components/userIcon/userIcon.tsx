import Button from '../../components/button/button';
import { getInitials } from '../../utils/format';
import { IconColorProvider } from '../../utils/iconColorProvider';
import './userIcon.scss';
import React from 'react';

// import { useAuth } from '../../hooks/auth';


interface UserIconProps {
    id?: string
    userId: string
    className?: string
    children: string
    onClick?: React.MouseEventHandler
}

export const UserIcon = ({ id, userId, children, className, onClick }: UserIconProps) => {

    // const { getColor } = useAuth();
    // const color = getColor();
    // console.log(x);
    // const bgColor = IconColorProvider.getHSLColor(`${color}`, 60, 50);
    const bgColor = IconColorProvider.getHSLColor(userId, 60, 50);
    const classes = `user-icon ${className || ''}`;

    if (onClick) {
        return <Button id={id} className={classes} bgColor={bgColor} onClick={onClick}>{getInitials(children)}</Button>;
    }

    return <div id={id} className={classes} style={{ backgroundColor: bgColor }}>{getInitials(children)}</div>;
};

