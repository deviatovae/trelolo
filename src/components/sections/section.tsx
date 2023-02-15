import { WindowAddTask } from '../window/windowAddTask';
import React, { useEffect, useState } from 'react';
import { Task } from '../task/task';
import { Section as SectionModel } from '../../types/models';
import { useTasks } from '../../hooks/useTasks';
import { WindowDelete } from '../window/windowDelete';
import { useSections } from '../../hooks/useSections';


export const Section = ({ section: { id, name } }: { section: SectionModel }) => {
  const { tasks: { items: tasks }, createTask } = useTasks();
  const { deleteSection } = useSections();

  // const [tasks, setTasks] = useState<{ [key: string]: string[] }>({
  //   [id]: sectionTasks
  // });

  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [taskNameInColumnWindow, setTaskNameInColumnWindow] = useState(false);
  const [deleteColumnWindow, setDeleteColumnWindow] = useState(false);
  const [, setInputValue] = useState(name);

  useEffect(() => {
    document.addEventListener('keydown', checkKeyDown);
    return () => {
      document.removeEventListener('keydown', checkKeyDown);
    };
  });

  const handleClickAddTaskPlus = (column: string) => {
    setActiveColumn(column);
    setTaskNameInColumnWindow(!taskNameInColumnWindow);
  };

  const handleCrossClick = () => {
    setTaskNameInColumnWindow(false);
  };

  const handleAddTask = (taskName: string) => {
    createTask({ name: taskName });
    // setTasks({ ...tasks, [column]: [...tasks[column], inputValue] });
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
    // let data;
    // try {
    // data = JSON.parse(e.dataTransfer.getData('text/task'));
    // } catch (error) {
    //   return;
    // }
    // const oldColumn = data.column;
    // const oldTask = data.task;
    // const newTasks = { ...tasks };
    // const oldTaskIndex = tasks[oldColumn].indexOf(oldTask);
    // newTasks[oldColumn].splice(oldTaskIndex, 1);
    // newTasks[column] = [...newTasks[column], oldTask];
    // setTasks(newTasks);
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


  // const renameHandleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const newName = e.target.value;
  //   setInputValue(newName);
  // };

  const checkKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setDeleteColumnWindow(false);
      setTaskNameInColumnWindow(false);
      setInputValue(name);
    }
  };

  const handleCrossColumnClick = ( column: string) => {
    setActiveColumn(column);
    setDeleteColumnWindow(!deleteColumnWindow);
  };


  const handleDeleteColumn = async () => {
     setDeleteColumnWindow(false);
     await deleteSection(id);
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
          <div className="column-list-item__header">{name}
            {/* <input 
              className="column-list-item__header-input"
              type="text" 
              value={name}
              onChange={(e) => setInputValue(e.target.value)}
              // value={inputValuecolumn}
              // onBlur={renameHandleInputBlur}
              // onKeyDown={checkKeyDown}
              /> */}
            </div>

            <div className="column-list-item__cross" onClick={() => handleCrossColumnClick(name)}></div>
          </div>
          <div

          // drag and drop task
          onDragOver={(e) => dragOverHandleTask(e)}
          onDrop={(e) => dropHandlerTask(e, name)}
          className="column-list-item__content-wrapper">

          {/* window delete column */}
          {deleteColumnWindow && activeColumn === name ? (
          <WindowDelete 
          deleteColumn={handleDeleteColumn}
          />
          ) : ('')
          }

          {/* create tasks */}
          {tasks.map((task, idx) => <Task key={idx} task={task} />)}

          {/* window add task */}
          {taskNameInColumnWindow && activeColumn === name ? (
            <WindowAddTask onCreateProject={(inputValue) => handleAddTask(inputValue)} onClickCross={handleCrossClick} />
          ) : ('')
          }
          <div className="column-list-item__btn-add-task-plus" onClick={() => handleClickAddTaskPlus(name)}>+ Add task</div>
        </div>
      </div>
    </>
  );
};
