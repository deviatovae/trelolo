import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import React from 'react';
import { ProjectsProvider } from '../../context/projectsContext';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';


export const Main = () => {
  return (
    <main className="main-wrapper _container wrapper">
      <ProjectsProvider>
        <Aside/>
        <section className="main__section">
          < Greeting />
          <ProjectCardList />
          <div className="main__img"></div>
        </section>
      </ProjectsProvider>
    </main>
  );
};

