import { WindowAddTask } from '../window/windowAddTask';
import React, { useEffect, useState } from 'react';
import { Task } from '../task/task';
import { Section as SectionModel } from '../../types/models';
import { useTasks } from '../../hooks/useTasks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DnDType } from '../../types/types';
import { WindowDelete } from '../window/windowDelete';
import { useSections } from '../../hooks/useSections';
import { SectionNameInput } from './sectionNameInput';

interface SectionProps {
  section: SectionModel
}

export const Section = ({ section: { id, name, position } }: SectionProps) => {
  const { getTasks, createTask } = useTasks();
  const { deleteSection } = useSections();
  const { items: tasks } = getTasks(id);

  const [isSectionDraggable, setIsSectionDraggable] = useState(true);
  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [showCreatTask, setShowCreatTask] = useState(false);
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [showCross, setShowCross] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', checkKeyDown);
    return () => {
      document.removeEventListener('keydown', checkKeyDown);
    };
  });

  const checkKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setShowDeleteSection(false);
      setShowCreatTask(false);
      // setInputValue(name);
    }
  };

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

  const handleCrossColumnClick = (column: string) => {
    setActiveColumn(column);
    setShowDeleteSection(!showDeleteSection);
  };

  const handleDeleteColumn = async () => {
    await deleteSection(id);
    setShowDeleteSection(false);
  };
  const closeDeleteSection = () => setShowDeleteSection(false);

  return (
    <Draggable key={id} draggableId={id} index={position} isDragDisabled={isSectionDraggable}>
      {(DragProvided) => (
        <div className="project-page__column-list-item"
             {...DragProvided.draggableProps} ref={DragProvided.innerRef}
        >
          <div className="column-list-item__header-settings-container" {...DragProvided.dragHandleProps}
               onMouseOver={() => setShowCross(true)}
               onMouseOut={() => setShowCross(false)}>
            <SectionNameInput
              sectionId={id}
              name={name}
              onMouseOver={() => setIsSectionDraggable(true)}
              onMouseOut={() => setIsSectionDraggable(false)}
            />
            <div className={`column-list-item__cross ${showCross ? 'column-list-item__cross_visible' : ''}`} onClick={() => handleCrossColumnClick(name)}></div>
          </div>
          <Droppable key={id} droppableId={id} type={DnDType.Task}>
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
                {showDeleteSection && activeColumn === name &&
                  (<WindowDelete deleteColumn={handleDeleteColumn} onClose={closeDeleteSection} />)}

                {tasks.map((task, idx) => <Task key={idx} task={task} index={idx} />)}
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