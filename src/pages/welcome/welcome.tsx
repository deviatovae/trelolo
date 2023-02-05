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
          <Link to={'/login'} className="welcome-content__btn">
            <Button isRound>{ <FormattedMessage id='loginBtn' /> }</Button>
          </Link>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

