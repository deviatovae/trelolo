import Input from '../../input/input';
import { Modal } from '../../modal/modal';
import Select from '../../select/select';
import { useState } from 'react';
import './addMemberModal.scss';
import { MultiValue } from 'react-select';
import { Field } from '../../../types/types';
import { validateEmail } from '../../../utils/validation';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';
import { useProjects } from '../../../hooks/projects';
import { Form } from 'react-router-dom';
import { useMembers } from '../../../hooks/members';
import { errorsToString } from '../../../utils/errors';

interface AddMemberModalProps {
  onClose: () => void
}

export function AddMemberModal({ onClose }: AddMemberModalProps) {
  const { trans } = useTranslate();
  type Option = { value: string, label: string };
  const options: Option[] = useProjects().projects.map(({ id, name }) => ({ value: id, label: name }));
  const { addMembers } = useMembers();

  const [email, setEmail] = useState<Field>({ value: '', error: '' });
  const [projects, setProjects] = useState<Option[]>([]);
  const canAdd = projects.length > 0 && email.value;
  const handleChange = (values: MultiValue<Option>) => {
    setProjects([...values]);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email.value)) {
      setEmail(prev => ({ value: prev.value, error: trans(Message.InvalidEmail) }));
    }
    const projectIds = projects.map(({ value: projectId }) => projectId);
    const errors = await addMembers(email.value, projectIds);
    if (errors) {
      setEmail(prev => ({ value: prev.value, error: errorsToString(errors[0] || []) }));
    }
  };

  return (
    <Modal title={trans(Message.InviteMemberHeader)} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <div className="add-member">
          <div className="add-member__field">
            <p className="add-member__field-label">{trans(Message.InviteMemberLabelEmail)}</p>
            <Input type="email"
                   placeholder={trans(Message.EnterMemberEmail)}
                   value={email.value}
                   error={email.error}
                   onChange={(e) => setEmail({ value: e.target.value, error: '' })}
            />
          </div>
          <div className="add-member__field">
            <p className="add-member__field-label">{trans(Message.InviteMemberLabelProjects)}</p>
            <Select isMulti options={options} placeholder={trans(Message.EnterProjects)} onChange={handleChange}></Select>
          </div>
          <button className={'modal__add-btn' + (canAdd ? ' modal__add-btn_active' : '')}>
            {trans(Message.Add)}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
