import { WindowAddTask } from '../window/windowAddTask';
import React, { useState } from 'react';
import { Task } from '../task/task';
import { Section as SectionModel } from '../../types/models';

export const Section = ({ section: { id, name }, tasks: sectionTasks }: { section: SectionModel, tasks: string[] }) => {
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({
    [id]: sectionTasks
  });
  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [taskNameInColumnWindow, setTaskNameInColumnWindow] = useState(false);

  const handleClickAddTaskPlus = (column: string) => {
    setActiveColumn(column);
    setTaskNameInColumnWindow(!taskNameInColumnWindow);
  };

  const handleCrossClick = () => {
    setTaskNameInColumnWindow(false);
  };

  const handleAddTask = (column: string, inputValue: string) => {
    setTasks({ ...tasks, [column]: [...tasks[column], inputValue] });
    setTaskNameInColumnWindow(false);
  };

  const dragOverHandleTask = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // const dragStartHandlerTask = (e: React.DragEvent, column: string, task: string) => {
  //   e.dataTransfer.setData('text/task', JSON.stringify({ task, column }));
  //   e.stopPropagation();
  // };

  const dropHandlerTask = (e: React.DragEvent, column: string) => {
    let data;
    try {
      data = JSON.parse(e.dataTransfer.getData('text/task'));
    } catch (error) {
      return;
    }
    const oldColumn = data.column;
    const oldTask = data.task;
    const newTasks = { ...tasks };
    const oldTaskIndex = tasks[oldColumn].indexOf(oldTask);
    newTasks[oldColumn].splice(oldTaskIndex, 1);
    newTasks[column] = [...newTasks[column], oldTask];
    setTasks(newTasks);
    e.stopPropagation();
  };

  const dragStartHandlerColumn = (e: React.DragEvent, index: string) => {
    e.dataTransfer.setData('text/column', JSON.stringify({ index }));
    e.stopPropagation();
  };

  const dragOverHandleColumn = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandlerColumn = (e: React.DragEvent, index: string) => {
    // const data = JSON.parse(e.dataTransfer.getData('text/column'));
    // const oldIndex = data.index;
    // const newColumns = [...columns];
    // newColumns.splice(index, 0, newColumns.splice(oldIndex, 1)[0]);
    // setColumns(newColumns);
    e.stopPropagation();
  };

  return (
    <>
      <div
        // drag and drop column
        draggable={true}
        onDragOver={(e) => dragOverHandleColumn(e)}
        onDrop={(e) => dropHandlerColumn(e, id)}
        onDragStart={(e) => dragStartHandlerColumn(e, id)}

        className="project-page__column-list-item">
        <div className="column-list-item__header-settings-container">
          <div className="column-list-item__header">{name}</div>
          <div className="column-list-item__setings"></div>
        </div>
        <div

          // drag and drop task
          onDragOver={(e) => dragOverHandleTask(e)}
          onDrop={(e) => dropHandlerTask(e, name)}
          className="column-list-item__content-wrapper">

          {/* create tasks */}
          {tasks[id]?.map((task, taskIndex) => (
            <Task key={taskIndex} task={{ id: taskIndex.toString(), name: task }} />
          ))}

          {/* window add task */}
          {taskNameInColumnWindow && activeColumn === name ? (
            <WindowAddTask onCreateProject={(inputValue) => handleAddTask(activeColumn, inputValue)} onClickCross={handleCrossClick} />
          ) : ('')
          }
          <div className="column-list-item__btn-add-task-plus" onClick={() => handleClickAddTaskPlus(name)}>+ Add task</div>
        </div>
      </div>
    </>
  );
};
