import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import './menuLink.scss';

interface MenuLinkProps {
  to: string
  children: ReactNode
  className?: string
}

export const MenuLink = ({ to, className = '', children }: MenuLinkProps) => {
  const classNames = ['menu-link', className].join(' ');

  return (
    <NavLink to={to} className={({ isActive }) => isActive ? `${classNames} menu-link_active` : classNames}>{children}</NavLink>
  );
};
