import './taskModal.scss';
import Button from '../button/button';
import { useAuth } from '../../hooks/auth';
import Select from '../select/select';
import Comment from '../comment/comment';
import { Modal } from '../modal/modal';
import { Textearea } from '../textarea/textearea';
import { useProjects } from '../../hooks/projects';
import { DatePicker } from '../date-picker/DatePicker';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { useMembers } from '../../hooks/members';
import { Task } from '../../types/models';

interface TaskModalProps {
  onClose: () => void
  task: Task
}

export function TaskModal({ onClose, task }: TaskModalProps) {

  type Option = { value: string, label: string };

  const { userInfo } = useAuth();
  const { trans } = useTranslate();

  const { getGroupedMembers } = useMembers();
  const members = getGroupedMembers();

  const projectsPptions: Option[] = useProjects().projects.map(({ id, name }) => ({ value: id, label: name }));

  const membersOptions: Option[] = members.map(({ id, name }) => ({ value: id, label: name }));

  const statusOptions: Option[] = [
    { value: '1', label: 'ToDo' },
    { value: '2', label: 'in progress' },
    { value: '3', label: 'Done' }
  ];

  return (
    <Modal className="task-section" classNameWrapper="task-wrapper" classNameMain='task-main' onClose={onClose}>
      {/* <div className="task-close"></div> */}
      <div className='task-management'>
        <Button className='task-button'>✓ {trans(Message.MarkCompleted)}</Button>
        <Button className='task-button'>{trans(Message.DeleteTask)}</Button>
      </div>
      {<h2>{task.name}</h2>}
      <div className='task-info'>
        <span>{trans(Message.Assignee)}</span>
        <div className='assignee-info'>
          <Select options={membersOptions}></Select>
          {/* {userInfo && <UserIcon userId={userInfo.id}>{userInfo.name}</UserIcon>}
          <p>{userInfo?.name}</p> */}
          <Button className='delete-button'>
            <div className='delete'></div>
          </Button>
        </div>
        <span className='deadline'>{trans(Message.DueDate)}</span>
        <div className="deadline-info">
          <DatePicker></DatePicker>
        </div>
        <span>{trans(Message.Status)}</span>
        <Select options={statusOptions}></Select>
        <span>{trans(Message.Projects)}</span>
        <Select isMulti options={projectsPptions} placeholder="Projects..."></Select>
      </div>

      <div className='task-description'>
        <span>{trans(Message.Description)}</span>
        <Textearea placeholder={trans(Message.WhatIsThisTaskAbout)} className='task-description-textarea' />
      </div>
      <div className='separator-line'></div>
      <div className='task-comments'></div>
      {userInfo && <Comment id={userInfo?.id} name={userInfo?.name} text='sdfd'></Comment>}
      <div className='separator-line'></div>
      <Textearea placeholder={trans(Message.WriteAComment)} />
    </Modal>
  );
}
