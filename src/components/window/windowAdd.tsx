import './windowAdd.scss';
import { ModalProps } from '../types/modalProps';
import { useState } from 'react';


export const WindowAdd = ({ onCreate, placeholderProps }: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleCreateProject = () => onCreate(inputValue);

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
