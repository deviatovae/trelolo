import Input from '../../input/input';
import { Modal } from '../../modal/modal';
import Select from '../../select/select';
import { useState } from 'react';
import './addMemberModal.scss';
import { MultiValue } from 'react-select';
import { SelectOption } from '../../../types/types';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';
import { useProjects } from '../../../hooks/projects';
import { Form } from 'react-router-dom';
import { Member, Project } from '../../../types/models';
import { useMembers } from '../../../hooks/members';
import { errorsToString } from '../../../utils/errors';

interface UpdateMemberModalProps {
  onClose: () => void
  email: string
  members: Member[]
}

export function UpdateMemberModal({ onClose, email, members }: UpdateMemberModalProps) {
  const { trans } = useTranslate();
  const { addMember, deleteMember } = useMembers();
  const { projects: allProjects } = useProjects();
  const projects = members.map(({ project }) => project);
  const [inputError, setInputError] = useState('');

  const projectToOption: (project: Project) => SelectOption = ({ id, name }) => ({ value: id, label: name });
  const options: SelectOption[] = allProjects.map(projectToOption);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(projects.map(projectToOption));

  const handleChange = (values: MultiValue<SelectOption>) => {
    setSelectedOptions([...values]);
  };

  const handleSubmit = async () => {
    const addNewProjects = () => {
      return selectedOptions
        .filter(({ value }) => !projects.some(({ id }) => id === value))
        .map(({ value }) => addMember(value, { email }));
    };

    const removeProjects = () => {
      return members
        .filter(({ project: { id: projectId } }) => !selectedOptions.some(({ value }) => projectId === value))
        .map(({ id }) => deleteMember(id));
    };

    const errors = await Promise.all([...addNewProjects(), ...removeProjects()]);
    const hasErrors = errors.filter(error => !!error).length;

    if (hasErrors) {
      setInputError(errorsToString(errors[0] || []));
    } else {
      onClose();
    }
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
            <Select isMulti options={options} value={selectedOptions} placeholder={trans(Message.EnterProjects)} onChange={handleChange}></Select>
          </div>
          <button className="modal__add-btn modal__add-btn_active">
            {trans(Message.Update)}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
