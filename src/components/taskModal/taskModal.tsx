import './taskModal.scss';
import Button from '../button/button';
import Select from '../select/select';
import Comment from '../comment/comment';
import { Modal } from '../modal/modal';
import { Textearea } from '../textarea/textearea';
// import { useProjects } from '../../hooks/projects';
import { DatePicker } from '../date-picker/DatePicker';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { useMembers } from '../../hooks/members';
import { Task } from '../../types/models';
import { useSections } from '../../hooks/useSections';
import { TasksContextValue } from '../../context/tasksContext';
import Input from '../input/input';
import React, { FormEvent, useEffect, useState } from 'react';
import { ActionMeta } from 'react-select';
import { TaskUpdateData } from '../../API/types';
import { useComments } from '../../hooks/comments';

interface TaskModalProps {
  onClose: () => void
  task: Task
  context: TasksContextValue
}

const DEFAULT_ASSIGNEE_OPTION = { value: '0', label: 'No assignee' }; 

export function TaskModal({ onClose, task, context }: TaskModalProps) {

  type Option = { value: string, label: string };

  const { createComment, deleteComment, updateComments, editComment, comments } = useComments();
  const { trans } = useTranslate();
  const [title, setTitle] = useState(task.name || '');
  const [status, setStatus] = useState(task.sectionId || null);
  const [description, setDescription] = useState(task.description || '');
  const [comment, setComment] = useState('');

  const { deleteTask, updateTask, moveTask } = context;

  const { getGroupedMembers } = useMembers();
  const members = getGroupedMembers();

  const { sections } = useSections();

  // const projectsOptions: Option[] = useProjects().projects.map(({ id, name }) => ({ value: id, label: name }));

  useEffect(() => {
    updateComments(task.id);
  }, [updateComments, task.id]);

  const membersOptions: Option[] = members.map(({ id, name }) => ({ value: id, label: name }));

  const statusOptions: Option[] = sections.items.map(({ id, name }) => ({ value: id, label: name }));

  const defaultValueAssignee = membersOptions.find(({ value }) => value === task.assignees[0]?.memberId) || DEFAULT_ASSIGNEE_OPTION;
  const [assignee, setAssignee] = useState<Option>(defaultValueAssignee);

  const defaultValueStatus = statusOptions.find(({ value }) => value === status);


  const deleteCurrentTask = async () => {
    const errors = await deleteTask(task.id);
    if (!errors) {
      onClose();
    }
  };

  const updateInfo = async (updatedData: TaskUpdateData) => {
    const errors = await updateTask(task.id, { ...updatedData });
    if (errors) {
      onClose();
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBlurTitle = () => {
    updateInfo({ name: title });
  };

  const assigneeHandleChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    if (option?.value) {
      const newAssignee = {
        value: option.value,
        label:  option.label,
      };

      setAssignee(newAssignee);

      updateInfo({ assignees: [option.value] });
    }
  };

  const deleteAssignee = () => {
    updateInfo({ assignees: [] });
    setAssignee(DEFAULT_ASSIGNEE_OPTION);
  };

  const statusHandleChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
    if (option?.value) {

      setStatus(option.value);
      moveTask(task.id, option.value);
    }
  };

  const descriptionOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const commentOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const descriptionOnBlur = () => {
    if (description) {
      updateInfo({ description: description });
    }
  };

  const onSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    await createComment(task.id, comment);
    setComment('');
  };

  return (
    <Modal className="task-section" classNameWrapper="task-wrapper" classNameMain="task-main" onClose={onClose}>
      <div className="task-management">
        {/* <Button className="task-button" onClick={completeTask}>✓ {trans(Message.MarkCompleted)}</Button> */}
        <Button className="task-button" onClick={deleteCurrentTask}>{trans(Message.DeleteTask)}</Button>
      </div>
      <Input placeholder="Write a task title" value={title} type="text" onChange={onChangeTitle} onBlur={onBlurTitle} className="task-title-input"></Input>
      <div className="task-info">
        <span>{trans(Message.Assignee)}</span>
        <div className="assignee-info">
          <Select value={assignee} options={membersOptions} onChange={assigneeHandleChange} defaultValue={defaultValueAssignee}></Select>
          {/* {userInfo && <UserIcon userId={userInfo.id}>{userInfo.name}</UserIcon>}
          <p>{userInfo?.name}</p> */}
          <Button className="delete-button" onClick={deleteAssignee}>
            <div className="delete"></div>
          </Button>
        </div>
        <span className="deadline">{trans(Message.DueDate)}</span>
        <div className="deadline-info">
          <DatePicker dueDate={task.dueDate} onChange={updateInfo}></DatePicker>
        </div>
        <span>{trans(Message.Status)}</span>
        <Select options={statusOptions} onChange={statusHandleChange} defaultValue={defaultValueStatus}></Select>
        {/* <span>{trans(Message.Projects)}</span>
        <Select isMulti options={projectsPptions} placeholder="Projects..."></Select> */}
      </div>

      <div className="task-description">
        <span>{trans(Message.Description)}</span>
        <Textearea placeholder={trans(Message.WhatIsThisTaskAbout)}
          className="task-description-textarea"
          onBlur={descriptionOnBlur}
          onChange={descriptionOnChange}
          value={description} />
      </div>
      <div className="separator-line"></div>
      <ul className="task-comments">
        {comments.items.map(({ user: { id: userId, name }, text, createdAt, id }) => <Comment
          key={id}
          userId={userId}
          commentId={id}
          name={name}
          text={text}
          createdAt={createdAt}
          deleteComment={deleteComment}
          editComment={editComment}
          />)}
      </ul>
      <div className="separator-line"></div>
      <form action="" className="comment-form" onSubmit={onSubmitComment}>
        <Textearea placeholder={trans(Message.WriteAComment)} value={comment} onChange={commentOnChange} />
        <Button className="comment-button" disabled={!comment}>Comment</Button>
      </form>
    </Modal>
  );
}
