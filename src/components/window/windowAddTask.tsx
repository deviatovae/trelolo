import './windowAddTask.scss';
import React, { useRef, useState } from 'react';
import { WindowProps } from './../../components/types/windowProps';
import { MouseHandler } from '../mouse/mouseHandler';

export const WindowAddTask = ({ onClickCross, onCreateProject }: WindowProps)=> {
  const [inputValue, setInputValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const handleCreateProject = () => onCreateProject(inputValue);


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
        placeholder="Write a task name..."
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={CheckKeyDown}
      />
      <div className="window-add-task__buttons-container">
        <button className="window-add-task__btn-add" disabled={inputValue.length === 0} onClick={handleCreateProject}>Add task</button>
        <div className="window-add-task__cross-add" onClick={onClickCross}></div>
      </div>
    </div>
  );
};
