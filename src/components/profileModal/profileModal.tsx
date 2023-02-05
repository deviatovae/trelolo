import './profileModal.scss';
import { ProfileModalProps } from '../types/profileModalProps';
import { useNavigate } from 'react-router-dom';

export const ProfileModal = ({ onClickOutside, animShowModal, animHideModal }: ProfileModalProps) => {
  const history = useNavigate();
  const handleLogOutClick = () => {
    history('/');
  };

  const handleClass = () => {
    const modalWindows = document.querySelector('.modal-windows') as HTMLElement;
    modalWindows.classList.remove('hide');
    modalWindows.classList.remove('show');

    if (animShowModal) {
      modalWindows.classList.add('show');
    } 
    if (animHideModal) {
      modalWindows.classList.add('hide');
    }
  };
  return (
    <div className="modal-overlay" onClick={onClickOutside}>
      <div className="modal-windows" ref={handleClass}>
        <div className="modal-windows__account">Account</div>
        <div className="modal-windows__person">
          <div className="modal-person__logo">KZ</div>
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