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

  const edit = () => {
    setIsEditing(true);
  };

  const editCancel = () => {
    setIsEditing(false);
    onMouseOut();
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
      editCancel();
      return;
    }
    if (error) {
      return;
    }
    const errors = await updateSection(sectionId, { name: value });
    if (!errors) {
      editCancel();
    } else {
      setError(errorsToString(errors));
    }
  };

  if (isEditing) {
    return (<>
      <KeyboardHandler onEnter={onBlur} onEsc={editCancel} />
      <Input
        type="text"
        autoFocus={true}
        classNameWrapper="column-list-item__header-input"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={error}
        maxLength={25}
      />
    </>);
  }

  return (
    <div className="column-list-item__header"
      onClick={edit}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      {name}
    </div>
  );
};
