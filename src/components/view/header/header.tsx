import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent } from 'react';
import './header.scss';
import LangSwitcher from '../../langSwitcher/langSwitcher';
import { FormattedMessage } from 'react-intl';

interface HeaderProps {
  currentLocale: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Header = (props: HeaderProps) => {
  const history = useNavigate();
  const handleLogoClick = () => {
    history('/');
  };

  return (
    <header className="header">
      <div className="header__content _container">
        <div className="header__logo-wrapper" onClick={handleLogoClick}>
          <div className="header__logo"></div>
          <div className="header__logo-text">
          <FormattedMessage id='logoText' />
          </div>
        </div> 
        <div className="header__lang-user-wrapper">
        <LangSwitcher
        currentLocale={props.currentLocale} 
        handleChange={props.handleChange} 
        />
        {/* <div className="header__user">KZ</div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
