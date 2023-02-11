import './projectCardAction.scss';
import React from 'react';
import { Errors } from '../../../API/types';
import Input from '../../input/input';
import { useValidationErrors } from '../../../hooks/validation';
import { useProjectCard } from '../../../hooks/useProjectCard';

interface ProjectCreateCardProps {
  onClose: () => void,
  onCreate: (inputValue: string) => void
  errors: Errors | null
}

export const ProjectCreateCard = ({ onClose, onCreate, errors }: ProjectCreateCardProps) => {
  const { fieldName, setFieldName, isChanged, handleNameChange, onClickOverlay } = useProjectCard({ onClose });
  const handleButtonClick = () => onCreate(fieldName.value);

  useValidationErrors(errors || [], { name: setFieldName });

  return (
    <div className="modal-overlay" onClick={onClickOverlay}>
      <div className="modal-main">
        <Input
          type="text"
          className="modal-main__project-name"
          placeholder="Write a project name"
          value={fieldName.value}
          onChange={handleNameChange}
          error={fieldName.error}
        />
        <button className="modal-main__btn-create-project" disabled={!isChanged} onClick={handleButtonClick}>Create</button>
      </div>
    </div>
  );
};
