import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import { MainModal } from '../../components/mainModal/mainModal';
import React, { useState } from 'react';
import { ProjectsProvider } from '../../context/projectsContext';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';


export const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([] as string[]);

  const handleAddProjectClick = () => {
    setShowModal(true);
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
      <ProjectsProvider>
        <Aside/>
        <section className="main__section">
          < Greeting/>
          <ProjectCardList onCreate={handleAddProjectClick}/>
          <div className="main__img"></div>
          {showModal && (
            <MainModal ShowModal={showModal} onClickOutside={handleModalClickOutside} onCreateProject={onCreateProject}/>
          )}
        </section>
      </ProjectsProvider>
    </main>
  );
};

