import './modal.scss';
import { ReactNode, MouseEvent } from 'react';

interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ title, children, onClose }: ModalProps) {
  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-wrapper" onClick={handleClickOutside}>
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header modal-header">
            <p className="modal-header__title">{title}</p>
            <div className="modal-header__close-btn" onClick={onClose}></div>
          </div>
          <div className="modal__main">{children}</div>
        </div>
      </div>
    </div>
  );
}
