import './header.scss';
import { UserIcon } from '../../userIcon/userIcon';
import { ProfileModal } from '../../profileModal/profileModal';
import React, { useEffect, useState } from 'react';
import LangSwitcher from '../../langSwitcher/langSwitcher';
import { Logo } from '../../logo/logo';
import { useAuth } from '../../../hooks/auth';

interface HeaderProps {
  currentLocale: string;
  setLocale: (locale: string) => void;
}

const Header = (props: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const { userInfo, logout } = useAuth();

  const handleUserIconClick = () => {
    setShowModal(!showModal);
  };

  const handleModalClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    setShowModal(false);
  }, [userInfo]);

  return (
    <header className="header">
      <div className="header__content">
        <Logo />
        <div className="header__lang-user-wrapper">
          <LangSwitcher
            currentLocale={props.currentLocale}
            setLocale={props.setLocale}
          />
          {userInfo && <UserIcon userId={userInfo.id} onClick={handleUserIconClick}>{userInfo.name}</UserIcon>}
        </div>
      </div>
      {showModal && userInfo && (
        <ProfileModal ShowModal={showModal} onClickOutside={handleModalClickOutside} userInfo={userInfo} logout={logout} />
      )}
    </header>
  );
};

export default Header;
