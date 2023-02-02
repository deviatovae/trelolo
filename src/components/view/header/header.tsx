import React from 'react';
import './headerViews.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <div className="header__logo"></div>
        <div className="header__logo-text">trelolo</div>
      </div>

      <div className="header__lang-user-wrapper">
        <div className="header__lang">EN</div>
        <div className="header__user">KZ</div>
      </div>
    </header>
  );
};

export default Header;
