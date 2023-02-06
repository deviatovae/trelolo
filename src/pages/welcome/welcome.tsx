import { FormattedMessage } from 'react-intl';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import './welcome.scss';

export const Welcome = () => {

  return (
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
              <div className="visuals__title">Kanban view</div>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_discuss"></div>
              <div className="visuals__title">Discuss tasks</div>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_due-date"></div>
              <div className="visuals__title">Set due date</div>
            </div>
          </div>
          <Link to={'/login'} className="welcome-content__btn">
            <Button isRound>{ <FormattedMessage id='loginBtn' /> }</Button>
          </Link>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

