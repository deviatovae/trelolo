import React from 'react';
import './welcomeViews.scss';

export const Welcome = () => {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-content wrapper">
        <div className="welcome-content__left">
          <div className="welcome-content__header">
            WORKSPACE FOR YOUR TEAM
          </div>
          <div className="welcome-content__btn">
            LOG IN
          </div>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

