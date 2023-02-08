import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import { MainModal } from '../../components/mainModal/mainModal';
import { useState } from 'react';


export const Main = () => {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([] as string[]);

    const handleUserIconClick = () => {
        setShowModal(!showModal);
      };
    
    const handleModalClickOutside = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        setShowModal(false);
      }
    };

    const onCreateProject = (inputValue: string) => {
        setProjects([...projects, inputValue]);
        setShowModal(false);
    };

  return (
    <main className="main-wrapper _container wrapper">
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
              <div className='main__list-btn' onClick={handleUserIconClick}>+ Create new project</div>
            </div>
          </div>
          <div className='main__img'></div>
          {showModal && (
        <MainModal ShowModal={showModal} onClickOutside={handleModalClickOutside} onCreateProject={onCreateProject}/>
        )}
        </section>
    </main>
  );
};

