import './mainModal.scss';
import { MainModalProps } from '../types/mainModalProps';
import { useState } from 'react';


export const MainModal = ({ onClickOutside, onCreateProject }: MainModalProps)=> {
  const [inputValue, setInputValue] = useState('');
  const handleCreateProject = () => onCreateProject(inputValue);

    return (
      <div className="modal-overlay" onClick={onClickOutside}>
        <div className="modal-main">
          <input className='modal-main__project-name' placeholder='Write a project name' onChange={(event) => setInputValue(event.target.value)}></input>
          <button className='modal-main__btn-create-project' disabled={inputValue.length === 0} onClick={handleCreateProject}>Create</button>
        </div>
      </div>
    );
};