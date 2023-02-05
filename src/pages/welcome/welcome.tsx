import './welcome.scss';
import Button from '../../components/button/button';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export const Welcome = () => {

  return (
    <div className="welcome-wrapper">
      <div className="welcome-content wrapper">
        <div className="welcome-content__left">
          <h1 className="welcome-content__header">
            <FormattedMessage id='welcomeHeader' />
          </h1>
          <div className="welcome-content__btn">
            <Button isRound>{ <FormattedMessage id='loginBtn' /> }</Button>
          </div>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

