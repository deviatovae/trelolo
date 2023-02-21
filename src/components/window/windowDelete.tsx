import './windowDelete.scss';
import React, { useEffect, useRef } from 'react';
import { MouseHandler } from '../mouse/mouseHandler';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';

interface WindowDeleteProps {
  deleteColumn: () => void
  onClose: () => void
}

export const WindowDelete = ({ deleteColumn, onClose }: WindowDeleteProps) => {
  const { trans } = useTranslate();

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
        <span className="window-delete__text">{trans(Message.AreYouSure)}? </span>
        <button className="window-delete__btn" onClick={handleDeleteColumn}>{trans(Message.Delete)}</button>
      </div>
    </div>
  );
};
