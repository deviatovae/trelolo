import './profileModal.scss';
import { ProfileModalProps } from '../types/profileModalProps';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../userIcon/userIcon';

export const ProfileModal = ({ onClickOutside, avatarName, userInfo, logout }: ProfileModalProps) => {

  const history = useNavigate();
  const handleLogOutClick = () => {
    history('/');
    logout();
  };

  return (
    <div className="modal-overlay" onClick={onClickOutside}>
      <div className="modal-windows">
        <div className="modal-windows__account">Account</div>
        <div className="modal-windows__person">
          <UserIcon>{ avatarName }</UserIcon>
          <div className="modal-person__name-email">
            {<div className="modal-person__name">{ userInfo?.name }</div>}
            <div className="modal-person__email">{ userInfo?.email }</div>
          </div>
        </div>
        <div className="modal-windows__line"></div>
        <div className="modal-windows__log-out" onClick={handleLogOutClick}>Log out</div>
      </div>
    </div>
  );
};
