import './header.scss';
// import { useNavigate } from 'react-router-dom';
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
  // const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  // const handleLogoClick = () => {
  //   history('/');
  // };

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
        <ProfileModal animShowModal={showModal} animHideModal={hideModal} onClickOutside={handleModalClickOutside}/>
      )}
    </header>
  );
};

export default Header;
