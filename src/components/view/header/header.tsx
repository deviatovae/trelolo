import './header.scss';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../../userIcon/userIcon';
import { ProfileModal } from '../../profileModal/profileModal';
import { useState } from 'react';
import LangSwitcher from '../../langSwitcher/langSwitcher';

interface HeaderProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

const Header = (props: HeaderProps) => {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const handleLogoClick = () => {
    history('/');
  };

  const handleUserIconClick = () => {
    setShowModal(!showModal);
    setHideModal(false);
  };

  const handleModalClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setHideModal(!hideModal);
      setTimeout(() => setShowModal(false), 260);
    }
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
          <div onClick={handleUserIconClick} >
          <UserIcon />
          </div>
        </div>
      </div>
      {showModal && (
        <ProfileModal animShowModal={showModal} animHideModal={hideModal} onClickOutside={handleModalClickOutside}/>
      )}
    </header>
  );
};

export default Header;
