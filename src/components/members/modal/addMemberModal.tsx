import Input from '../../input/input';
import { Modal } from '../../modal/modal';
import Select from '../../select/select';
import { useState } from 'react';
import './addMemberModal.scss';
import { MultiValue } from 'react-select';

interface AddMemberModalProps {
  onClose: () => void
}

export function AddMemberModal({ onClose }: AddMemberModalProps) {
  type Option = { value: string, label: string };
  const options: Option[] = [
    { value: '1', label: 'My project' },
    { value: '2', label: 'Trelolo' },
    { value: '3', label: 'Vanilla' }
  ];

  const [email, setEmail] = useState('');
  const [projects, setProjects] = useState<Option[]>([]);
  const isEmailValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/);
  const canAdd = projects.length > 0 && isEmailValid?.length;
  const handleChange = (values: MultiValue<Option>) => {
    setProjects([...values]);
  };

  return (
    <Modal title="Invite people to My Projects" onClose={onClose}>
      <div className="add-member">
        <div>
          <p className="add-member__field-label">Add a team member to your project</p>
          <Input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <p className="add-member__field-label">Add to projects</p>
          <Select isMulti options={options} placeholder="Projects..." onChange={handleChange}></Select>
        </div>
        <button className={'modal__add-btn' + (canAdd ? ' modal__add-btn_active' : '')}>Add</button>
      </div>
    </Modal>
  );
}
