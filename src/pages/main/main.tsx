import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import { WindowAdd } from '../../components/window/windowAdd';
import { useState, useEffect } from 'react';

export const Main = () => {
  const [newProjectWindow, setNewProjectWindow] = useState(false);
  const [projects, setProjects] = useState([] as string[]);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
    document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleUserClickNewProject = () => {
    setNewProjectWindow(!newProjectWindow);
    };
  
  const onCreateProject = (inputValue: string) => {
      setProjects([...projects, inputValue]);
      setNewProjectWindow(false);
  };

  const checkModalOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (newProjectWindow && 
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
        setNewProjectWindow(false);
    }
  };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setNewProjectWindow(false);
    }
  };

  return (
    <main className="main-wrapper _container wrapper" onClick={checkModalOtsideClick}>
        <Aside />
        <section className='main__section'>
          < Greeting />
          <div className='main__your-projects-wrapper wrapper'>
          <h4>Your projects ({projects.length})</h4>
            <div className='main__your-projects-list'>

              {projects.map((project, index) => (
                <div key={index} className='main__your-project-item'>{project}</div>
              ))
              }

              {newProjectWindow ? (
                <WindowAdd showWindow={newProjectWindow} onCreateProject={onCreateProject} placeholderProps={'Write a project name'}/>
                 ) : (
                  <div className='main__list-btn' onClick={handleUserClickNewProject}>+ Create new project</div>
                )}
            </div>
          </div>
          <div className='main__img'></div>
        </section>
    </main>
  );
};

