import './profileModal.scss';
import { ProfileModalProps } from '../types/profileModalProps';
import { FormattedMessage } from 'react-intl';
import { Message } from '../languages/messages';
import { Route } from '../../router/routes';
import { Link } from 'react-router-dom';
import { ProfilePerson } from './profilePerson';


export const ProfileModal = ({ onClickOutside, userInfo: { id, name, email }, logout }: ProfileModalProps) => {
  const handleLogOutClick = () => {
    logout();
  };
  
  return (

    <div className="modal-overlay" onClick={onClickOutside}>
      <div className="modal-windows">
        <div className="modal-windows__account">
          <FormattedMessage id={Message.Account} />
        </div>
        <ProfilePerson id={id} name={name} email={email}/>
        <div className="modal-windows__line"></div>
        <Link to={Route.PROFILE} className="modal-windows__profile">
          <FormattedMessage id={Message.MyProfile} />
        </Link>
        <div className="modal-windows__log-out" onClick={handleLogOutClick}>
          <FormattedMessage id={Message.LogOut} />
        </div>
      </div>
    </div>

  );
};
