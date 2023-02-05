import { useNavigate } from 'react-router-dom';
import './header.scss';
import { UserIcon } from '../../userIcon/userIcon';
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
          <div className="header__logo">
            <div className="header__logo1"></div>
            <div className="header__logo2"></div>
            <div className="header__logo3"></div>
          </div>
          <div className="header__logo-text">trelolo</div>
        </div>
        <div className="header__lang-user-wrapper">
          <LangSwitcher
            currentLocale={props.currentLocale}
            setLocale={props.setLocale}
          />
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
