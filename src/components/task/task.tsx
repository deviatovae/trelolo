import { UserIcon } from '../userIcon/userIcon';
import React from 'react';
import { Task as TaskModel } from '../../types/models';
import { useTaskModal } from '../../hooks/useTaskModal';
import { Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../../hooks/useTasks';

export const Task = ({ task, index }: { task: TaskModel, index: number }) => {
  const context = useTasks();
  const { showTaskModal } = useTaskModal();
  const { name } = task;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => showTaskModal(task, context)}
          className="column-list-item__task-container wrapper"
        >
          <div className="column-list-item__task-logo-container">
            <div className="column-list-item__task">{name}</div>
            <div className="column-list-item__logo"><UserIcon userId="24">KZ</UserIcon></div>
          </div>
          <div className="column-list-item__calendar-settings-container">
            <div className="column-list-item__calendar"></div>
            <div className="column-list-item__settings"></div>
          </div>
        </div>
      )}

    </Draggable>
  );
};
