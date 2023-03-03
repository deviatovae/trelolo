import './windowDelete.scss';
import React, { useEffect, useRef, useState } from 'react';
import { MouseHandler } from '../mouse/mouseHandler';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import Button from '../button/button';

interface WindowDeleteProps {
  deleteColumn: () => void
  onClose: () => void
}

export const WindowDelete = ({ deleteColumn, onClose }: WindowDeleteProps) => {
  const { trans } = useTranslate();

  const ref = useRef<HTMLDivElement>(null);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', checkKeyDown);
    return () => {
      document.removeEventListener('keydown', checkKeyDown);
    };
  });

  const handleDeleteColumn = async () => {
    setIsInProgress(true);
    await deleteColumn();
    setIsInProgress(false);
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
        <Button className="window-delete__btn" onClick={handleDeleteColumn} isLoading={isInProgress}>
          {trans(Message.Delete)}
        </Button>
      </div>
    </div>
  );
};
