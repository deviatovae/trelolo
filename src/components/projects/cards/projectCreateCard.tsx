import './projectCardAction.scss';
import React, { useRef, useState } from 'react';
import { Errors } from '../../../API/types';
import Input from '../../input/input';
import { useFieldValidator } from '../../../hooks/validation';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../button/button';

interface ProjectCreateCardProps {
  onClose: () => void,
  onCreate: (inputValue: string) => void
  errors: Errors | null
}

export const ProjectCreateCard = ({ onClose, onCreate, errors }: ProjectCreateCardProps) => {
  const { trans } = useTranslate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { fieldName, setFieldName, isChanged, handleNameChange } = useProjectCard({ onClose, onSubmit: onCreate, cardRef });
  const [isInProgress, setIsInProgress] = useState(false);
  const handleButtonClick = async () => {
    setIsInProgress(true);
    await onCreate(fieldName.value);
    setIsInProgress(false);
  };

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
      <Button className="modal-main__btn-create-project" disabled={!isChanged} onClick={handleButtonClick} isLoading={isInProgress}>
        <FormattedMessage id={Message.Create} />
      </Button>
    </div>
  );
};
