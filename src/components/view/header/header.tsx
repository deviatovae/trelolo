import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import './header.scss';
import LangSwitcher from '../../langSwitcher/langSwitcher';

interface HeaderProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
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
          trelolo
          </div>
        </div>
        <div className="header__lang-user-wrapper">
        <LangSwitcher
        currentLocale={props.currentLocale}
        setLocale={props.setLocale}
        />
        {/* <div className="header__user">KZ</div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
