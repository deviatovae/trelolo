import './modal.scss';
import { MadalProps } from '../types/modalProps';
import { useState } from 'react';


export const Modal = ({ onCreateProject, placeholderProps }: MadalProps)=> {
  const [inputValue, setInputValue] = useState('');
  const handleCreateProject = () => onCreateProject(inputValue);

  const CheckKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleCreateProject();
    }
  };

  return (
    <div className="modal-overl">
      <div className="modal-main">
        <input className='modal-main__project-name' placeholder={placeholderProps} 
          onChange={(event) => setInputValue(event.target.value)} onKeyDown={CheckKeyDown}>
        </input>
        <button className='modal-main__btn-create-project' disabled={inputValue.length === 0} onClick={handleCreateProject}>Create</button>
      </div>
    </div>
  );
};