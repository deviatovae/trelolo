import './windowDelete.scss';
import React, { useEffect, useRef } from 'react';
import { MouseHandler } from '../mouse/mouseHandler';

interface WindowDeleteProps {
  deleteColumn: () => void
  onClose: () => void
}

export const WindowDelete = ({ deleteColumn, onClose }: WindowDeleteProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('keydown', checkKeyDown);
    return () => {
      document.removeEventListener('keydown', checkKeyDown);
    };
  });

  const handleDeleteColumn = () => {
    deleteColumn();
  };

  const checkKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
    deleteColumn();
    }
  };

  return (
    <div className="window-delete" ref={ref}>
      <MouseHandler elementRef={ref} onClickOutside={onClose}></MouseHandler>
      <div className="window-delete__container">
        <div className="window-delete__text">
          are you sure?
        </div>
        <button className="window-delete__btn" onClick={handleDeleteColumn}>Delete</button>
      </div>
    </div>
  );
};
