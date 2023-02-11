import React, { ChangeEvent, useEffect, useState } from 'react';
import { Field } from '../types/types';

interface UseProjectCardProps {
  onClose: () => void,
  name?: string
}

export const useProjectCard = ({ onClose, name = '' }: UseProjectCardProps) => {
  const [fieldName, setFieldName] = useState<Field>({ value: name, error: '' });
  const [isChanged, setIsChanged] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldName(prev => ({ ...prev, value }));
    setIsChanged(value !== name);
  };

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  });

  const onClickOverlay = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return { onClickOverlay, fieldName, setFieldName, handleNameChange, isChanged };
};
