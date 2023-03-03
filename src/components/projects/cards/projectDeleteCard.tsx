import './projectCardAction.scss';
import React, { useRef, useState } from 'react';
import { Errors } from '../../../API/types';
import { Project } from '../../../types/models';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';
import { useProjectCard } from '../../../hooks/useProjectCard';
import Button from '../../button/button';

interface ProjectDeleteCardProps {
  project: Project
  onClose: () => void
  onDelete: () => void
  errors: Errors | null
}

export const ProjectDeleteCard = ({ project: { name }, onClose, onDelete }: ProjectDeleteCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useProjectCard({ onClose, onSubmit: onDelete, cardRef });
  const [isInProgress, setIsInProgress] = useState(false);
  const handleButtonClick = async () => {
    setIsInProgress(true);
    await onDelete();
    setIsInProgress(false);
  };

  return (
    <div className="modal-main" ref={cardRef}>
      <h3>{name}</h3>
      <Button className="modal-main__btn-create-project" onClick={handleButtonClick} isLoading={isInProgress}>
        <FormattedMessage id={Message.Delete} />
      </Button>
    </div>
  );
};
