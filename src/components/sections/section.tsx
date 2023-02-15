import { WindowAddTask } from '../window/windowAddTask';
import React, { useState } from 'react';
import { Task } from '../task/task';
import { Section as SectionModel } from '../../types/models';
import { useTasks } from '../../hooks/useTasks';
import { Droppable } from 'react-beautiful-dnd';

interface SectionProps {
  section: SectionModel
}

export const Section = ({ section: { id, name } }: SectionProps) => {
  const { tasks: { items: tasks }, createTask } = useTasks();

  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [showCreatTask, setShowCreatTask] = useState(false);

  const handleClickAddTaskPlus = (column: string) => {
    setActiveColumn(column);
    setShowCreatTask(!showCreatTask);
  };

  const handleCrossClick = () => {
    setShowCreatTask(false);
  };

  const handleAddTask = (taskName: string) => {
    createTask({ name: taskName });
    setShowCreatTask(false);
  };

  return (
    <div className="project-page__column-list-item">
      <div className="column-list-item__header-settings-container">
        <div className="column-list-item__header">{name}</div>
        <div className="column-list-item__setings"></div>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            {...provided.droppableProps}
            className="column-list-item__content-wrapper"
          >
            {tasks.map((task, idx) => <Task key={idx} task={task} />)}
            {showCreatTask && activeColumn === name && (
              <WindowAddTask onCreateProject={(inputValue) => handleAddTask(inputValue)} onClickCross={handleCrossClick} />
            )}
            <div className="column-list-item__btn-add-task-plus" onClick={() => handleClickAddTaskPlus(name)}>+ Add task</div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
