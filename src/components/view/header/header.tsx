import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import { UserIcon } from '../../userIcon/userIcon';

const Header = () => {
  const history = useNavigate();

  const handleLogoClick = () => {
    history('/');
  };

  return (
    <header className="header">
      <div className="header__content _container">
        <div className="header__logo-wrapper" onClick={handleLogoClick}>
          <div className="header__logo"></div>
          <div className="header__logo-text">trelolo</div>
        </div>
        <div className="header__lang-user-wrapper">
          <div className="header__lang">EN</div>
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
