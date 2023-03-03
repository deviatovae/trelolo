import Input from '../../input/input';
import { Modal } from '../../modal/modal';
import Select from '../../select/select';
import React, { useState } from 'react';
import './addMemberModal.scss';
import { ActionMeta, MultiValue } from 'react-select';
import { SelectOption } from '../../../types/types';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';
import { useProjects } from '../../../hooks/projects';
import { Form } from 'react-router-dom';
import { Member, Project } from '../../../types/models';
import { useMembers } from '../../../hooks/members';
import { errorsToString } from '../../../utils/errors';
import Button from '../../button/button';

interface UpdateMemberModalProps {
  onClose: () => void
  email: string
  members: Member[]
}

const sortOptions = (values: readonly SelectOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

export function UpdateMemberModal({ onClose, email, members }: UpdateMemberModalProps) {
  const { trans } = useTranslate();
  const { addMember, deleteMember } = useMembers();
  const { getMyProjects } = useProjects();
  const myProjects = getMyProjects();
  const memberProjects = members.map(({ project }) => project);
  const [inputError, setInputError] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);

  const projectToOption: (project: Project) => SelectOption = ({ id, name }) => ({
    value: id,
    label: name,
    isFixed: !myProjects.some((myProject) => myProject.id === id),
  });

  const [values, setValues] = useState<SelectOption[]>(sortOptions(memberProjects.map(projectToOption)));
  const options: SelectOption[] = myProjects.map(projectToOption);

  const handleChange = (newValues: MultiValue<SelectOption>, meta: ActionMeta<SelectOption>) => {
    switch (meta.action) {
      case 'remove-value':
      case 'pop-value':
        if (meta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        setValues(values.filter((v) => v.isFixed));
        return;
    }

    setValues(sortOptions(newValues));
  };

  const handleSubmit = async () => {
    const addNewProjects = () => {
      return values
        .filter(({ value }) => !memberProjects.some(({ id }) => id === value))
        .map(({ value }) => addMember(value, { email }));
    };

    const removeProjects = () => {
      return members
        .filter(({ project: { id: projectId } }) => !values.some(({ value }) => projectId === value))
        .map(({ id }) => deleteMember(id));
    };

    setIsInProgress(true);
    const errors = await Promise.all([...addNewProjects(), ...removeProjects()]);
    const hasErrors = errors.filter(error => !!error).length;

    if (hasErrors) {
      setInputError(errorsToString(errors[0] || []));
    } else {
      await onClose();
    }
    setIsInProgress(false);
  };

  return (
    <Modal title={trans(Message.UpdateMemberHeader)} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <div className="add-member">
          <div className="add-member__field">
            <p className="add-member__field-label">{trans(Message.MemberLabelEmail)}</p>
            <Input type="email"
                   disabled
                   value={email}
                   error={inputError}
                   onChange={() => ({})}
            />
          </div>
          <div className="add-member__field">
            <p className="add-member__field-label">{trans(Message.MemberLabelProjects)}</p>
            <Select
              isMulti
              options={options}
              value={values}
              placeholder={trans(Message.EnterProjects)}
              onChange={handleChange}
            ></Select>
          </div>
          <Button className="modal__add-btn modal__add-btn_active" isLoading={isInProgress}>
            {trans(Message.Update)}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
