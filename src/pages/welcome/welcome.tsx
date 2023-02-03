import React from 'react';
import './welcome.scss';
import Button from '../../components/button/button';

export const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-content wrapper">
        <div className="welcome-content__left">
          <h1 className="welcome-content__header">
            WORKSPACE FOR YOUR TEAM
          </h1>
          <div className="welcome-content__btn">
            <Button isRound>LOG IN</Button>
          </div>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

