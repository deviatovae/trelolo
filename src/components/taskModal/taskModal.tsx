import './taskModal.scss';
import Button from '../button/button';
import { UserIcon } from '../userIcon/userIcon';
import { useAuth } from '../../hooks/auth';
import Select from '../select/select';
import Comment from '../comment/comment';
import { Modal } from '../modal/modal';
import './taskModal.scss';
import { Textearea } from '../textarea/textearea';
import { useProjects } from '../../hooks/projects';

interface TaskModalProps {
  onClose: () => void
  title: string
}

export function TaskModal({ onClose, title }: TaskModalProps) {

  type Option = { value: string, label: string };

  const { userInfo } = useAuth();
  const options: Option[] = useProjects().projects.map(({ id, name }) => ({ value: id, label: name }));

  const statusOptions: Option[] = [
    { value: '1', label: 'ToDo' },
    { value: '2', label: 'in progress' },
    { value: '3', label: 'Done' }
  ];

  return (
    <Modal className="task-section" classNameWrapper="task-wrapper" classNameMain='task-main' onClose={onClose}>
      {/* <div className="task-close"></div> */}
      <div className='task-management'>
        <Button className='task-button'>✓ Mark completed</Button>
        <Button className='task-button'>Delete task</Button>
      </div>
      {<h2>{title}</h2>}
      <div className='task-info'>
        <span>Assignee</span>
        <div className='assignee-info'>
          {userInfo && <UserIcon userId={userInfo.id}>{userInfo.name}</UserIcon>}
          <p>{userInfo?.name}</p>
          <div className='delete'></div>
        </div>
        <span>Due date</span>
        <div className="deadline-info">
          <p>21 04</p>
          <div className='delete'></div>
        </div>
        <span>Status</span>
        <Select options={statusOptions}></Select>
        <span>Projects</span>
        <Select isMulti options={options} placeholder="Projects..."></Select>
      </div>

      <div className='task-description'>
        <span>Description</span>
        <Textearea placeholder='What is this task about?' className='task-description-textarea'/>
      </div>
      <div className='separator-line'></div>
      <div className='task-comments'></div>
      {userInfo && <Comment id={userInfo?.id} name={userInfo?.name} text='sdfd'></Comment>}
      <div className='separator-line'></div>
      <Textearea placeholder='Write a comment...' />
    </Modal>
  );
}
