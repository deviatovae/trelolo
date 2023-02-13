import { Message } from '../languages/messages';
import { Form } from 'react-router-dom';
import Input from '../input/input';
import { Modal } from '../modal/modal';
import { useTranslate } from '../../hooks/useTranslate';
import { useState } from 'react';
import { Field } from '../../types/types';
import { useProjects } from '../../hooks/projects';
import { useFieldValidator } from '../../hooks/validation';

interface CreateProjectModalProps {
  onClose: () => void
}

export const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const { trans } = useTranslate();
  const [name, setName] = useState<Field>({ value: '', error: '' });
  const { addProject } = useProjects();
  const validator = useFieldValidator();

  const handleSubmit = async () => {
    const errors = await addProject({ name: name.value });
    if (errors) {
      return validator.validate(errors, { name: setName });
    }
    onClose();
  };

  return (
    <Modal title={trans(Message.CreateNewProject)} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <div className="add-member">
          <div className="add-member__field">
            <Input type="text"
                   placeholder={trans(Message.EnterProjectName)}
                   value={name.value}
                   error={name.error}
                   onChange={(e) => setName({ value: e.target.value, error: '' })}
            />
          </div>
          <button className="modal__add-btn modal__add-btn_active">
            {trans(Message.Create)}
          </button>
        </div>
      </Form>
    </Modal>
  );
};
