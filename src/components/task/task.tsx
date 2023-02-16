import { UserIcon } from '../userIcon/userIcon';
import React from 'react';
import { Task as TaskModel } from '../../types/models';
import { useTaskModal } from '../../hooks/useTaskModal';
import { useTasks } from '../../hooks/useTasks';
import { formatDate } from '../../utils/formatDate';
import './task.scss';

export const Task = ({ task }: { task: TaskModel }) => {
  const context = useTasks();
  const { showTaskModal } = useTaskModal();
  const { name } = task;

  return (
    <>
      <div onClick={() => showTaskModal(task, context)}
        className="task-container wrapper">
        <div className="task-title-logo-container">
          <p className="task-title">{name}</p>
          <UserIcon userId="24">KZ</UserIcon>
        </div>
        <div className="task-calendar-settings-container">
          <div className="task-deadline">
            <div className="task-calendar"></div>
            { task.dueDate && <span className="task-deadline">{formatDate(new Date(task.dueDate), 'PP')}</span>}
          </div>
          <div className="task-settings"></div>
        </div>
      </div>
    </>
  );
};
