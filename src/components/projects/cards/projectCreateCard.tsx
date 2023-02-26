import './projectCardAction.scss';
import React, { useRef } from 'react';
import { Errors } from '../../../API/types';
import Input from '../../input/input';
import { useFieldValidator } from '../../../hooks/validation';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';

interface ProjectCreateCardProps {
  onClose: () => void,
  onCreate: (inputValue: string) => void
  errors: Errors | null
}

export const ProjectCreateCard = ({ onClose, onCreate, errors }: ProjectCreateCardProps) => {
  const { trans } = useTranslate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { fieldName, setFieldName, isChanged, handleNameChange } = useProjectCard({ onClose, onSubmit: onCreate, cardRef });
  const handleButtonClick = () => onCreate(fieldName.value);

  const { validate } = useFieldValidator();
  validate(errors || [], { name: setFieldName });

  return (
    <div className="modal-main" ref={cardRef}>
      <Input
        autoFocus={true}
        type="text"
        className="modal-main__project-name"
        placeholder={trans(Message.EnterProjectName)}
        value={fieldName.value}
        onChange={handleNameChange}
        error={fieldName.error}
        maxLength={50}
      />
      <button className="modal-main__btn-create-project" disabled={!isChanged} onClick={handleButtonClick}>
        <FormattedMessage id={Message.Create} />
      </button>
    </div>
  );
};
