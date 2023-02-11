import './projectPage.scss';
import Aside from '../../components/aside/aside';
import { useState, useEffect } from 'react';
import { WindowAdd } from '../../components/window/windowAdd';
import { WindowAddTask } from '../../components/window/windowAddTask';
import { UserIcon } from '../../components/userIcon/userIcon';


export const ProjectPage = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [columnNameWindow, setColumnNameWindow] = useState(false);
  const [taskNameInColumnWindow, setTaskNameInColumnWindow] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | undefined>(undefined);


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

  const checkModalOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (columnNameWindow && 
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
        setColumnNameWindow(false);
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


  return (
    <div className="project-page__container _container wrapper" onClick={checkModalOtsideClick} >
      <Aside></Aside>
      <section className='project-page__section'>
        <h4>trelolo</h4>
        <div className='project-page__projects-wrapper'>
          <div className='project-page__column-list' style={{ width: increaseWidth(columns.length) }}>

          {columns.map((project, index) => (
            <div key={index} className='project-page__column-list-item'>
              <div className='column-list-item__header'>{project}</div>
              <div className='column-list-item__content-wrapper'>

   


                {tasks[project]?.map((task, ind) => (
                <div key={ind} className='column-list-item__task-container wrapper'>
                  <div className='column-list-item__task-logo-container'>
                    <div className='column-list-item__task'>{task}</div>
                    <div className='column-list-item__logo'><UserIcon>KZ</UserIcon></div>
                  </div>
                  <div className='column-list-item__calendar-settings-container'>
                    <div className='column-list-item__calendar'></div>
                    <div className='column-list-item__settings'></div>
                  </div>
                </div>



              ))}

              {taskNameInColumnWindow && activeColumn === project ? (
                <WindowAddTask onCreateProject={(inputValue) => handleAddTask(activeColumn, inputValue)} />
              ) : (
                <div className='column-list-item__btn-add-task-plus' onClick={() => handleClickAddTaskPlus(project)}>+ Add task</div>
              )}


              </div>
            </div>
          ))}
  
          {columnNameWindow ? (
            <WindowAdd showWindow={columnNameWindow} onCreateProject={handleAddColumn} placeholderProps={'Write a column name'}/>
          ) : (
            <div className='project-page__column-list-btn' onClick={handleClickAddColumn}><span>+ Add column</span></div>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};
  