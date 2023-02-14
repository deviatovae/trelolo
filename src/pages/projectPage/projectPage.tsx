import './projectPage.scss';
import Aside from '../../components/aside/aside';
import { useEffect, useState } from 'react';
import { WindowAdd } from '../../components/window/windowAdd';
import { WindowAddTask } from '../../components/window/windowAddTask';
import { UserIcon } from '../../components/userIcon/userIcon';
import { TaskModal } from '../../components/taskModal/taskModal';
import { ProjectsProvider } from '../../context/projectsContext';
import { MembersProvider } from '../../context/membersContext';

export const ProjectPage = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [columnNameWindow, setColumnNameWindow] = useState(false);
  const [taskNameInColumnWindow, setTaskNameInColumnWindow] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<{ task: string; taskIndex: number } | null>(null);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
      document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleClickAddColumn = () => {
    setColumnNameWindow(!columnNameWindow);
  };


  const handleClickAddTaskPlus = (column: string) => {
    setActiveColumn(column);
    setTaskNameInColumnWindow(!taskNameInColumnWindow);
  };

  const handleCrossClick = () => {
    setTaskNameInColumnWindow(false);
  };

  const checkWindowAddOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (columnNameWindow &&
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
      setColumnNameWindow(false);
    }

    if (taskNameInColumnWindow &&
      (!(event.target as HTMLElement).classList.contains('window-add-task__input')) &&
      (!(event.target as HTMLElement).classList.contains('window-add-task')) &&
      (!(event.target as HTMLElement).classList.contains('window-add-task__buttons-container'))) {
      setTaskNameInColumnWindow(false);
    }
  };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setColumnNameWindow(false);
      setTaskNameInColumnWindow(false);
    }
  };

  const handleAddColumn = (inputValue: string) => {
    setColumns([...columns, inputValue]);
    setTasks({ ...tasks, [inputValue]: [] });
    setColumnNameWindow(false);
  };

  const handleAddTask = (column: string, inputValue: string) => {
    setTasks({ ...tasks, [column]: [...tasks[column], inputValue] });
    setTaskNameInColumnWindow(false);
  };

  const increaseWidth = (columnsLength: number) => `${390 + 290 * columnsLength}px`;

  const dragOverHandleTask = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dragStartHandlerTask = (e: React.DragEvent, column: string, task: string) => {
    e.dataTransfer.setData('text/task', JSON.stringify({ task, column }));
    e.stopPropagation();
  };

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

  const dragStartHandlerColumn = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/column', JSON.stringify({ index }));
    e.stopPropagation();
  };

  const dragOverHandleColumn = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandlerColumn = (e: React.DragEvent, index: number) => {
    const data = JSON.parse(e.dataTransfer.getData('text/column'));
    const oldIndex = data.index;
    const newColumns = [...columns];
    newColumns.splice(index, 0, newColumns.splice(oldIndex, 1)[0]);
    setColumns(newColumns);
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    setAddTaskModal(false);
  };

  const handleOpenModal = (task: { task: string, taskIndex: number }) => () => {
    setCurrentTask(task);
    setAddTaskModal(true);

  };

  return (
    <ProjectsProvider>
      <div className="project-page__container _container wrapper" onClick={checkWindowAddOtsideClick}>
        <Aside></Aside>
        <section className='project-page__section'>
          <h4>trelolo</h4>
          <div className='project-page__projects-wrapper'>
            <div className='project-page__column-list' style={{ width: increaseWidth(columns.length) }}>

              {/* create column */}
              {columns.map((project, index) => (
                <>
                  <div
                    key={index}

                    // drag and drop column
                    draggable={true}
                    onDragOver={(e) => dragOverHandleColumn(e)}
                    onDrop={(e) => dropHandlerColumn(e, index)}
                    onDragStart={(e) => dragStartHandlerColumn(e, index)}

                    className='project-page__column-list-item'>
                    <div className='column-list-item__header-settings-container'>
                      <div className='column-list-item__header'>{project}</div>
                      <div className='column-list-item__setings'></div>
                    </div>
                    <div

                      // drag and drop task
                      onDragOver={(e) => dragOverHandleTask(e)}
                      onDrop={(e) => dropHandlerTask(e, project)}
                      className='column-list-item__content-wrapper'>

                      {/* create tasks */}
                      {tasks[project]?.map((task, taskIndex) => (
                        <div onClick={handleOpenModal({ task, taskIndex })}
                          key={taskIndex}
                          draggable={true}
                          onDragStart={(e) => dragStartHandlerTask(e, project, task)}
                          className='column-list-item__task-container wrapper'>
                          <div className='column-list-item__task-logo-container'>
                            <div className='column-list-item__task'>{task}</div>
                            <div className='column-list-item__logo'><UserIcon userId='24'>KZ</UserIcon></div>
                          </div>
                          <div className='column-list-item__calendar-settings-container'>
                            <div className='column-list-item__calendar'></div>
                            <div className='column-list-item__settings'></div>
                          </div>
                        </div>
                      ))}

                      {/* window add task */}
                      {taskNameInColumnWindow && activeColumn === project ? (
                        <WindowAddTask onCreateProject={(inputValue) => handleAddTask(activeColumn, inputValue)} onClickCross={handleCrossClick} />
                      ) : ('')
                      }
                      <div className='column-list-item__btn-add-task-plus' onClick={() => handleClickAddTaskPlus(project)}>+ Add task</div>
                    </div>
                  </div>
                </>
              ))}

              {/* window add column */}
              {columnNameWindow ? (
                <WindowAdd showWindow={columnNameWindow} onCreateProject={handleAddColumn} placeholderProps={'Write a column name'} />
              ) : (
                <div className='project-page__column-list-btn' onClick={handleClickAddColumn}><span>+ Add column</span></div>
              )}
            </div>
          </div>
        </section>
        <MembersProvider>
          {addTaskModal && currentTask && <TaskModal title={currentTask.task} onClose={handleCloseModal}></TaskModal>}
        </MembersProvider>
      </div>
    </ProjectsProvider>
  );
};
