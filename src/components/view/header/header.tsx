import './header.scss';
import { UserIcon } from '../../userIcon/userIcon';
import { ProfileModal } from '../../profileModal/profileModal';
import { useState } from 'react';
import LangSwitcher from '../../langSwitcher/langSwitcher';
import { Logo } from '../../logo/logo';
import './header.scss';

interface HeaderProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

const Header = (props: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  // const [hideModal, setHideModal] = useState(false);

  const handleUserIconClick = () => {
    setShowModal(!showModal);
  };

  const handleModalClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <header className="header">
      <div className="header__content _container">
        <Logo/>
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
        <ProfileModal ShowModal={showModal} onClickOutside={handleModalClickOutside}/>
      )}
    </header>
  );
};

export default Header;
