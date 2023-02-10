import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import { WindowAdd } from '../../components/window/windowAdd';
import { useState, useEffect } from 'react';

export const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([] as string[]);

  useEffect(() => {
    document.addEventListener('keydown', CheckKeyDown);
    return () => {
    document.removeEventListener('keydown', CheckKeyDown);
    };
  }, []);

  const handleUserIconClick = () => {
      setShowModal(!showModal);
    };
  
  const onCreateProject = (inputValue: string) => {
      setProjects([...projects, inputValue]);
      setShowModal(false);
  };

  const checkModalOtsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (showModal && 
      (!(event.target as HTMLElement).classList.contains('modal-main')) &&
      (!(event.target as HTMLElement).classList.contains('modal-main__project-name'))) {
      setShowModal(false);
    }
  };

  const CheckKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setShowModal(false);
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

              {showModal ? (
                <WindowAdd ShowModal={showModal} onCreateProject={onCreateProject} placeholderProps={'Write a project name'}/>
                 ) : (
                  <div className='main__list-btn' onClick={handleUserIconClick}>+ Create new project</div>
                )}
            </div>
          </div>
          <div className='main__img'></div>
        </section>
    </main>
  );
};

