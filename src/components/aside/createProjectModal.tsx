import { Message } from '../languages/messages';
import Input from '../input/input';
import { Modal } from '../modal/modal';
import { useTranslate } from '../../hooks/useTranslate';
import { ChangeEvent, useState } from 'react';
import { Field } from '../../types/types';
import { useProjects } from '../../hooks/projects';
import { useFieldValidator } from '../../hooks/validation';
import Button from '../button/button';
import { KeyboardHandler } from '../keyboard/keyboardHandler';

interface CreateProjectModalProps {
  onClose: () => void
}

export const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const { trans } = useTranslate();
  const [name, setName] = useState<Field>({ value: '', error: '' });
  const [isChanged, setIsChanged] = useState(false);
  const { addProject } = useProjects();
  const validator = useFieldValidator();
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    setName(prev => ({ ...prev, error: !prev.value ? trans(Message.EnterProjectName) : '' }));
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(prev => ({ ...prev, value }));
    setIsChanged(value !== name.value);
    validate();
  };
  const handleSubmit = async () => {
    setIsProcessing(true);

    validate();
    if (name.error) {
      setIsProcessing(false);
      return;
    }

    const errors = await addProject({ name: name.value });
    setIsProcessing(false);
    if (errors) {
      return validator.validate(errors, { name: setName });
    }
    onClose();
  };

  return (
    <Modal title={trans(Message.CreateNewProject)} onClose={onClose}>
      <KeyboardHandler onEnter={handleSubmit} onEsc={onClose} />
      <div className="add-member">
        <div className="add-member__field">
          <Input type="text"
            autoFocus={true}
            placeholder={trans(Message.EnterProjectName)}
            value={name.value}
            error={name.error}
            onChange={handleChangeName}
            disabled={isProcessing}
            maxLength={50}
          />
        </div>
        <Button className="modal__add-btn" disabled={!!name.error || !isChanged || isProcessing} onClick={handleSubmit}>
          {trans(Message.Create)}
        </Button>
      </div>
    </Modal>
  );
};
