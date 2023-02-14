import { UserIcon } from '../userIcon/userIcon';
import React from 'react';
import { Task as TaskModel } from '../../types/models';
import { useTaskModal } from '../../hooks/taskModal';

export const Task = ({ task }: { task: TaskModel }) => {
  const { showTaskModal } = useTaskModal();
  const { name } = task;

  return (
    <>
      <div onClick={() => showTaskModal(task)}
           className="column-list-item__task-container wrapper">
        <div className="column-list-item__task-logo-container">
          <div className="column-list-item__task">{name}</div>
          <div className="column-list-item__logo"><UserIcon userId="24">KZ</UserIcon></div>
        </div>
        <div className="column-list-item__calendar-settings-container">
          <div className="column-list-item__calendar"></div>
          <div className="column-list-item__settings"></div>
        </div>
      </div>
    </>
  );
};
