import { WindowAddTask } from '../window/windowAddTask';
import React, { useState } from 'react';
import { Task } from '../task/task';
import { Section as SectionModel } from '../../types/models';
import { useTasks } from '../../hooks/useTasks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DnDType } from '../../types/types';

interface SectionProps {
  section: SectionModel
}

export const Section = ({ section: { id, name, position } }: SectionProps) => {
  const { getTasks, createTask } = useTasks();
  const { items: tasks } = getTasks(id);

  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [showCreatTask, setShowCreatTask] = useState(false);

  const handleClickAddTaskPlus = (column: string) => {
    setActiveColumn(column);
    setShowCreatTask(!showCreatTask);
  };

  const handleCrossClick = () => {
    setShowCreatTask(false);
  };

  const handleAddTask = async (taskName: string) => {
    const errors = await createTask(id, { name: taskName });
    if (errors) {
      console.error(errors);
    } else {
      setShowCreatTask(false);
    }
  };

  return (
    <Draggable draggableId={id} index={position}>
      {(DragProvided) => (
        <div className="project-page__column-list-item"
             {...DragProvided.draggableProps} ref={DragProvided.innerRef}
        >
          <div className="column-list-item__header-settings-container" {...DragProvided.dragHandleProps}>
            <div className="column-list-item__header">{name}</div>
            <div className="column-list-item__setings"></div>
          </div>
          <Droppable droppableId={id} type={DnDType.Task}>
            {(provided, snapshot) => {
              const classes = [
                snapshot.isUsingPlaceholder ? 'column-list-item__content-wrapper_active2' : '',
                snapshot.isDraggingOver ? 'column-list-item__content-wrapper_active' : ''
              ].join(' ');
              return (<div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`column-list-item__content-wrapper ${classes}`}
              >
                {tasks.map((task, idx) => <Task key={idx} task={task} index={idx + 1} />)}
                {showCreatTask && activeColumn === name && (
                  <WindowAddTask onCreateProject={(inputValue) => handleAddTask(inputValue)} onClickCross={handleCrossClick} />
                )}
                <div className="column-list-item__btn-add-task-plus" onClick={() => handleClickAddTaskPlus(name)}>+ Add task</div>
                {provided.placeholder}
              </div>);
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
