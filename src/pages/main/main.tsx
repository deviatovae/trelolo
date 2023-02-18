import './main.scss';
import Aside from '../../components/aside/aside';
import Greeting from '../../components/greeting/greeting';
import React from 'react';
import { ProjectsProvider } from '../../context/projectsContext';
import { MainPageContent } from './mainPageContent';
import { MyTasksProvider } from '../../context/myTasksContext';

export const Main = () => {
  return (
    <main className="main-wrapper">
      <ProjectsProvider>
        <Aside />
        <section className="main__section">
          < Greeting />
          <div className="main__content">
            <MyTasksProvider>
              <MainPageContent />
            </MyTasksProvider>
          </div>
        </section>
        {/*<div className="main__img"></div>*/}
      </ProjectsProvider>
    </main>
  );
};

