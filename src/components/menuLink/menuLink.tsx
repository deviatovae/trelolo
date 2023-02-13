import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import './menuLink.scss';

interface MenuLinkProps {
  to: string
  children: ReactNode
}

export const MenuLink = ({ to, children }: MenuLinkProps) => {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'active-link' : ''}>{children}</NavLink>
  );
};
