import './modal.scss';
import { MouseEvent, ReactNode } from 'react';

interface ModalProps {
  title?: string
  children: ReactNode
  onClose: () => void
  className?: string
  classNameWrapper?: string
  classNameMain?: string
}

export function Modal({ title, children, onClose, className, classNameWrapper, classNameMain }: ModalProps) {
  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const classes = `modal ${className || ''}`;
  const classesWrapper = `modal-wrapper ${classNameWrapper || ''}`;
  const classesMain = `modal__main ${classNameMain || ''}`;

  return (
    <div className={classesWrapper} onMouseDown={handleClickOutside} style={{ zIndex: 10, cursor: 'auto' }}>
      <div className={classes}>
        <div className="modal__content">
          <div className="modal__header modal-header">
            {title && <p className="modal-header__title">{title}</p>}
            <div className="modal-header__close-btn" onClick={onClose}></div>
          </div>
          <div className={classesMain}>{children}</div>
        </div>
      </div>
    </div>
  );
}
