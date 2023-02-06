import { FormattedMessage } from 'react-intl';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import './welcome.scss';
import Greeting from '../../components/greeting/greeting';


export const Welcome = () => {

  return (
    <>
    <Greeting />
    <div className="welcome-wrapper">
      <div className="welcome-content wrapper">
        <div className="welcome-content__left">
          <h1 className="welcome-content__header">
            <FormattedMessage id='welcomeHeader' />
          </h1>
          <div className="welcome-content__description"><FormattedMessage id='welcomeDescription' /></div>
          <div className="welcome-content__visuals visuals">
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_kanban"></div>
              <p className="visuals__title"><FormattedMessage id='iconKanban' /></p>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_discuss"></div>
              <p className="visuals__title"><FormattedMessage id='iconDiscuss' /></p>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_due-date"></div>
              <p className="visuals__title"><FormattedMessage id='iconDueDate' /></p>
            </div>
          </div>
          <Link to={'/login'} className="welcome-content__btn">
            <Button isRound>{ <FormattedMessage id='loginBtn' /> }</Button>
          </Link>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
    </>
  );
};

