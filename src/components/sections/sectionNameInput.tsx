import React, { ChangeEvent, useState } from 'react';
import { useSections } from '../../hooks/useSections';
import Input from '../input/input';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { errorsToString } from '../../utils/errors';
import { KeyboardHandler } from '../keyboard/keyboardHandler';

interface SectionNameInputProps {
  onMouseOver: () => void
  onMouseOut: () => void
  sectionId: string
  name: string
}

export const SectionNameInput = ({ onMouseOver, onMouseOut, sectionId, name }: SectionNameInputProps) => {
  const [value, setValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const { updateSection } = useSections();
  const { trans } = useTranslate();

  const onEdit = () => {
    setIsEditing(true);
  };

  const onEditCancel = () => {
    setIsEditing(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    setValue(newValue);
    setError('');
    if (!newValue) {
      return setError(trans(Message.EnterName));
    }
  };

  const onBlur = async () => {
    if (name === value) {
      setIsEditing(false);
      return;
    }
    if (error) {
      return;
    }
    const errors = await updateSection(sectionId, { name: value });
    if (!errors) {
      setIsEditing(false);
    } else {
      setError(errorsToString(errors));
    }
  };

  if (isEditing) {
    return (<>
      <KeyboardHandler onEnter={onBlur} onEsc={onEditCancel} />
      <Input
        type="text"
        autoFocus={true}
        classNameWrapper="column-list-item__header-input"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={error}
      />
    </>);
  }

  return (
    <div className="column-list-item__header"
         onClick={onEdit}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}>
      {name}
    </div>
  );
};
