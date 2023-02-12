import './profileModal.scss';
import { ProfileModalProps } from '../types/profileModalProps';
import { UserIcon } from '../userIcon/userIcon';
import { getInitials } from '../../utils/format';

export const ProfileModal = ({ onClickOutside, userInfo: { name, email }, logout }: ProfileModalProps) => {
  const handleLogOutClick = () => {
    logout();
  };

  return (
    <div className="modal-overlay" onClick={onClickOutside}>
      <div className="modal-windows">
        <div className="modal-windows__account">Account</div>
        <div className="modal-windows__person">
          <UserIcon>{getInitials(name)}</UserIcon>
          <div className="modal-person__name-email">
            {<div className="modal-person__name">{name}</div>}
            <div className="modal-person__email">{email}</div>
          </div>
        </div>
        <div className="modal-windows__line"></div>
        <div className="modal-windows__log-out" onClick={handleLogOutClick}>Log out</div>
      </div>
    </div>
  );
};
