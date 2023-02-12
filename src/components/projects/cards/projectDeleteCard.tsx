import './projectCardAction.scss';
import React, { useRef } from 'react';
import { Errors } from '../../../API/types';
import { Project } from '../../../types/models';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';
import { useProjectCard } from '../../../hooks/useProjectCard';

interface ProjectDeleteCardProps {
  project: Project
  onClose: () => void
  onDelete: () => void
  errors: Errors | null
}

export const ProjectDeleteCard = ({ project: { name }, onClose, onDelete }: ProjectDeleteCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useProjectCard({ onClose, onSubmit: onDelete, cardRef });
  const handleButtonClick = () => onDelete();

  return (
    <div className="modal-main" ref={cardRef}>
      <h3>{name}</h3>
      <button className="modal-main__btn-create-project" onClick={handleButtonClick}>
        <FormattedMessage id={Message.Delete} />
      </button>
    </div>
  );
};
