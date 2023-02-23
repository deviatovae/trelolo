import Input from '../../input/input';
import { Modal } from '../../modal/modal';
import Select from '../../select/select';
import React, { ChangeEvent, useState } from 'react';
import './addMemberModal.scss';
import { MultiValue } from 'react-select';
import { Field, SelectOption } from '../../../types/types';
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
  const { addMembers, members: { items: members } } = useMembers();
  const [email, setEmail] = useState<Field>({ value: '', error: '' });
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const canAdd = projects.length > 0 && email.value && !email.error;

  const options: SelectOption[] = useProjects().getMyProjects().map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const handleChange = (values: MultiValue<SelectOption>) => {
    setProjects([...values]);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isMemberExist = members.some(({ user: { email: memberEmail } }) => memberEmail === value);
    const error = isMemberExist ? trans(Message.MemberAlreadyExist) : '';
    setEmail({ value, error });
  };

  const handleSubmit = async () => {
    if (!validateEmail(email.value)) {
      return setEmail(prev => ({ value: prev.value, error: trans(Message.InvalidEmail) }));
    }

    const projectIds = projects.map(({ value: projectId }) => projectId);
    const errors = await addMembers(email.value, projectIds);
    const hasErrors = errors.filter(error => !!error).length;

    if (hasErrors) {
      setEmail(prev => ({ value: prev.value, error: errorsToString(errors[0] || []) }));
    } else {
      onClose();
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
                   onChange={handleEmailChange}
            />
          </div>
          <div className="add-member__field">
            <p className="add-member__field-label">{trans(Message.InviteMemberLabelProjects)}</p>
            <Select isMulti options={options} placeholder={trans(Message.EnterProjects)} onChange={handleChange}></Select>
          </div>
          <button className={'modal__add-btn' + (canAdd ? ' modal__add-btn_active' : '')} disabled={!canAdd}>
            {trans(Message.Add)}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
