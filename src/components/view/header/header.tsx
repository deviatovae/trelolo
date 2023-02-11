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

  const avatarName = userInfo?.name.split(' ').reduce((acc, rec) => acc + rec[0], '').toUpperCase() || '';
  return (
    <header className="header">
      <div className="header__content _container">
        <Logo />
        <div className="header__lang-user-wrapper">
          <LangSwitcher
            currentLocale={props.currentLocale}
            setLocale={props.setLocale}
          />
          {userInfo && (<div onClick={handleUserIconClick} >
            <UserIcon>{avatarName}</UserIcon>
          </div>)}

        </div>
      </div>
      {showModal && userInfo && (
        <ProfileModal ShowModal={showModal} onClickOutside={handleModalClickOutside} avatarName={avatarName} userInfo={userInfo} logout={logout} />
      )}
    </header>
  );
};

export default Header;
