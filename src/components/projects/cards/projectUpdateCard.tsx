import './projectCardAction.scss';
import React, { useRef, useState } from 'react';
import { Errors } from '../../../API/types';
import Input from '../../input/input';
import { Project } from '../../../types/models';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { useFieldValidator } from '../../../hooks/validation';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';
import { useTranslate } from '../../../hooks/useTranslate';
import Button from '../../button/button';

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
  const [isInProgress, setIsInProgress] = useState(false);

  const { validate } = useFieldValidator();
  validate(errors || [], { name: setFieldName });
  const handleButtonClick = async () => {
    setIsInProgress(true);
    await onUpdate(fieldName.value);
    setIsInProgress(false);
  };

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
      />
      <Button className="modal-main__btn-create-project" disabled={!isChanged} onClick={handleButtonClick} isLoading={isInProgress}>
        <FormattedMessage id={Message.Update} />
      </Button>
    </div>
  );
};
