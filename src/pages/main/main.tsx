import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import React from 'react';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';
import { ProjectsProvider } from '../../context/projectsContext';
import { MyTasks } from '../../components/myTasks/myTasks';

export const Main = () => {
  return (
    <main className="main-wrapper">
      <ProjectsProvider>
        <Aside />
        <section className="main__section">
          < Greeting />
          <div className="main__content">
            <ProjectCardList />
            <MyTasks />
          </div>
        </section>
        {/*<div className="main__img"></div>*/}
      </ProjectsProvider>
    </main>
  );
};

