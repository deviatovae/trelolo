import { FormattedMessage } from 'react-intl';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/button/button';
import './welcome.scss';
import { useAuth } from '../../hooks/auth';
import { Route } from '../../router/routes';

export const Welcome = () => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to={Route.MAIN}/>;
  }

  return (
    <div className="welcome-wrapper">
      <div className="welcome-content wrapper _container">
        <div className="welcome-content__left">
          <h1 className="welcome-content__header">
            <FormattedMessage id="welcomeHeader"/>
          </h1>
          <div className="welcome-content__description"><FormattedMessage id="welcomeDescription"/></div>
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
  );
};

