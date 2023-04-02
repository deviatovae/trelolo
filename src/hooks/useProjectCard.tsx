import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import { Field } from '../types/types';

interface UseProjectCardProps {
  onClose: () => void
  onSubmit: (name: string) => void
  name?: string
  cardRef: RefObject<HTMLDivElement>
}

export const useProjectCard = ({ onClose, onSubmit, cardRef, name = '' }: UseProjectCardProps) => {
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
        return onClose();
      }
      if (e.key === 'Enter') {
        return onSubmit(fieldName.value);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as HTMLElement)) {
        return onClose();
      }
    };

    window.addEventListener('keydown', close);
    document.addEventListener('mousedown', onClick);

    return () => {
      document.body.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', close);
    };
  }, [cardRef, fieldName, onClose, onSubmit]);

  return { fieldName, setFieldName, handleNameChange, isChanged };
};
