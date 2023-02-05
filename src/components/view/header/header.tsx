import { UserIcon } from '../../userIcon/userIcon';
import LangSwitcher from '../../langSwitcher/langSwitcher';
import { Logo } from '../../logo/logo';
import './header.scss';

interface HeaderProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__content _container">
        <Logo/>
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
