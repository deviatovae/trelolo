import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import React from 'react';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';
import { ProjectsProvider } from '../../context/projectsContext';

export const Main = () => {
  return (
    <main className="main-wrapper">
      <ProjectsProvider>
        <Aside />
        <section className="main__section">
          < Greeting />
          <ProjectCardList />
          <div className="main__img"></div>
        </section>
      </ProjectsProvider>
    </main>
  );
};

