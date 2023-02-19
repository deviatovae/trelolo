import { UserIcon } from '../userIcon/userIcon';
import React from 'react';
import { Task as TaskModel } from '../../types/models';
import { useTaskModal } from '../../hooks/useTaskModal';
import { Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../../hooks/useTasks';
import { formatDateString } from '../../utils/formatDate';
import './task.scss';
import { useMembers } from '../../hooks/members';

export const Task = ({ task, index }: { task: TaskModel, index: number }) => {
  const context = useTasks();
  const { showTaskModal } = useTaskModal();
  const { name, assignees } = task;
  const { getGroupedMembers } = useMembers();
  const members = getGroupedMembers();

  const assignee = members.find((member) => member.id === assignees[0]?.memberId);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => showTaskModal(task, context)}
          className="task-container wrapper"
        >
          <div className="task-title-logo-container">
            <p className="task-title">{name}</p>
            { assignee && <UserIcon userId={assignee.id}>{assignee.name}</UserIcon>}
          </div>
          <div className="task-calendar-settings-container">
            <div className="task-deadline">
              <div className="task-calendar"></div>
              {task.dueDate && <span className="task-deadline">{formatDateString(task.dueDate, 'd MMMM')}</span>}
            </div>
            <div className="task-settings"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
