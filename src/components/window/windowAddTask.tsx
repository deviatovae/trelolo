import './windowAddTask.scss';
import { useState } from 'react';

 interface WindowProps {
  onCreateProject: (inputValue: string) => void;
 }

export const WindowAddTask = ({ onCreateProject }: WindowProps)=> {
  const [inputValue, setInputValue] = useState('');
  const handleCreateProject = () => onCreateProject(inputValue);


  return (
    <div className="window-add-task">
      <input className='window-add-task__input' placeholder='Write a task name...'
        onChange={(event) => setInputValue(event.target.value)}>
      </input>
      <div className='window-add-task__buttons-container'>
        <button className='window-add-task__btn-add' disabled={inputValue.length === 0} onClick={handleCreateProject}>Add tasks</button>
        <div className='window-add-task__cross-add'></div>
      </div>
    </div>
  );
};