import './windowAdd.scss';
import { ModalProps } from '../types/modalProps';
import { useRef, useState } from 'react';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import Button from '../button/button';
import { MouseHandler } from '../mouse/mouseHandler';

export const WindowAdd = ({ onCreate, onClickOutside, placeholderProps }: ModalProps) => {
  const { trans } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const handleCreateProject = async () => {
    setIsInProgress(true);
    await onCreate(inputValue);
    setIsInProgress(false);
  };

  const CheckKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleCreateProject();
    }
  };

  return (
    <>
      <MouseHandler elementRef={ref} onClickOutside={onClickOutside} />
      <div className="modal-overl" ref={ref}>
        <div className="modal-main">
          <input className="modal-main__project-name" placeholder={placeholderProps}  maxLength={25}
                 onChange={(event) => setInputValue(event.target.value)} onKeyDown={CheckKeyDown}>
          </input>
          <Button className="modal-main__btn-create-project" disabled={!inputValue.length} onClick={handleCreateProject} isLoading={isInProgress}>
            {trans(Message.Create)}
          </Button>
        </div>
      </div>
    </>
  );
};
