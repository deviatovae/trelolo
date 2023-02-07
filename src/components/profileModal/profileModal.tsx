import './profileModal.scss';
import { ProfileModalProps } from '../types/profileModalProps';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '../userIcon/userIcon';

export const ProfileModal = ({ onClickOutside }: ProfileModalProps) => {
  const history = useNavigate();
  const handleLogOutClick = () => {
    history('/');
  };

  return (
    <div className="modal-overlay" onClick={onClickOutside}>
      <div className="modal-windows">
        <div className="modal-windows__account">Account</div>
        <div className="modal-windows__person">
        <UserIcon />
          <div className="modal-person__name-email">
            <div className="modal-person__name">Kira Zaytseva</div>
            <div className="modal-person__email">kirazaytseva@gmail.com</div>
          </div>
        </div>
        <div className="modal-windows__line"></div>
        <div className="modal-windows__log-out" onClick={handleLogOutClick}>Log out</div>
      </div>
    </div>
  );
};