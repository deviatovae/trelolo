import './projectCardAction.scss';
import React, { useRef } from 'react';
import { Errors } from '../../../API/types';
import Input from '../../input/input';
import { Project } from '../../../types/models';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { useFieldValidator } from '../../../hooks/validation';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';
import { useTranslate } from '../../../hooks/useTranslate';

interface ProjectUpdateCardProps {
  project: Project
  onClose: () => void
  onUpdate: (inputValue: string) => void
  errors: Errors | null
}

export const ProjectUpdateCard = ({ project: { name }, onClose, onUpdate, errors }: ProjectUpdateCardProps) => {
  const { trans } = useTranslate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { fieldName, setFieldName, isChanged, handleNameChange } = useProjectCard({ onClose, onSubmit: onUpdate, name, cardRef });

  const { validate } = useFieldValidator();
  validate(errors || [], { name: setFieldName });
  const handleButtonClick = () => onUpdate(fieldName.value);

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
        <FormattedMessage id={Message.Update} />
      </button>
    </div>
  );
};
