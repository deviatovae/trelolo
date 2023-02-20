import './main.scss';
import Greeting from '../../components/greeting/greeting';
import React from 'react';
import { MainPageContent } from './mainPageContent';
import { MyTasksProvider } from '../../context/myTasksContext';

export const Main = () => {
  return (
    <>
      <section className="main__section">
        < Greeting />
        <div className="main__content">
          <MyTasksProvider>
            <MainPageContent />
          </MyTasksProvider>
        </div>
      </section>
      {/*<div className="main__img"></div>*/}
    </>
  );
};

