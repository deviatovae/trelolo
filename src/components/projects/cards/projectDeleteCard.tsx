import './projectCardAction.scss';
import React from 'react';
import { Errors } from '../../../API/types';
import { Project } from '../../../types/models';
import { useProjectCard } from '../../../hooks/useProjectCard';
import { Message } from '../../languages/messages';
import { FormattedMessage } from 'react-intl';

interface ProjectDeleteCardProps {
  project: Project
  onClose: () => void
  onDelete: () => void
  errors: Errors | null
}

export const ProjectDeleteCard = ({ project: { name }, onClose, onDelete, errors }: ProjectDeleteCardProps) => {
  const { onClickOverlay } = useProjectCard({ onClose });
  const handleButtonClick = () => onDelete();

  return (
    <div className="modal-overlay" onClick={onClickOverlay}>
      <div className="modal-main">
        <h3>{name}</h3>
        <button className="modal-main__btn-create-project" onClick={handleButtonClick}>
          <FormattedMessage id={Message.Delete} />
        </button>
      </div>
    </div>
  );
};
