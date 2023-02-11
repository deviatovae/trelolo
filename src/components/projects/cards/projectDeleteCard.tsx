import './projectCardAction.scss';
import React from 'react';
import { Errors } from '../../../API/types';
import { Project } from '../../../types/models';
import { useProjectCard } from '../../../hooks/useProjectCard';

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
        <button className="modal-main__btn-create-project" onClick={handleButtonClick}>Delete</button>
      </div>
    </div>
  );
};
