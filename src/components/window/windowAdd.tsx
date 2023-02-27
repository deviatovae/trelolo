import './windowAdd.scss';
import { ModalProps } from '../types/modalProps';
import { useState } from 'react';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';

export const WindowAdd = ({ onCreate, placeholderProps }: ModalProps) => {
  const { trans } = useTranslate();

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
        <input 
          className="modal-main__project-name" 
          placeholder={placeholderProps}
          onChange={(event) => setInputValue(event.target.value)} 
          onKeyDown={CheckKeyDown}
          maxLength={29}
          >
        </input>
        <button className="modal-main__btn-create-project" disabled={!inputValue.length} onClick={handleCreateProject}>{trans(Message.Create)}</button>
      </div>
    </div>
  );
};
