import './windowAddTask.scss';
import React, { useRef, useState } from 'react';
import { WindowProps } from './../../components/types/windowProps';
import { MouseHandler } from '../mouse/mouseHandler';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import Button from '../button/button';

export const WindowAddTask = ({ onClickCross, onCreateProject }: WindowProps)=> {
  const { trans } = useTranslate();

  const [inputValue, setInputValue] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleCreateProject = async () => {
    setIsInProgress(true);
    await onCreateProject(inputValue);
    setIsInProgress(false);
  };


  const CheckKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleCreateProject();
    }
  };

  return (
    <div className="window-add-task" ref={ref}>
      <MouseHandler elementRef={ref} onClickOutside={onClickCross}></MouseHandler>
      <input
        autoFocus={true}
        className="window-add-task__input"
        placeholder={trans(Message.WriteATaskTitle)}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={CheckKeyDown}
      />
      <div className="window-add-task__buttons-container">
        <Button className="window-add-task__btn-add" disabled={inputValue.length === 0} onClick={handleCreateProject} isLoading={isInProgress}>
          {trans(Message.AddTask)}
        </Button>
        <div className="window-add-task__cross-add" onClick={onClickCross}></div>
      </div>
    </div>
  );
};
