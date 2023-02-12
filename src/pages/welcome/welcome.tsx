import { FormattedMessage } from 'react-intl';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/button/button';
import './welcome.scss';
import { useAuth } from '../../hooks/auth';
import { Route } from '../../router/routes';
import { Message } from '../../components/languages/messages';

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
            <FormattedMessage id={Message.WelcomeHeader}/>
          </h1>
          <div className="welcome-content__description"><FormattedMessage id={Message.WelcomeDescription}/></div>
          <div className="welcome-content__visuals visuals">
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_kanban"></div>
              <p className="visuals__title"><FormattedMessage id={Message.IconKanban} /></p>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_discuss"></div>
              <p className="visuals__title"><FormattedMessage id={Message.IconDiscuss} /></p>
            </div>
            <div className="visuals__card">
              <div className="visuals__icon visuals__icon_due-date"></div>
              <p className="visuals__title"><FormattedMessage id={Message.IconDueDate} /></p>
            </div>
          </div>
          <Link to={'/login'} className="welcome-content__btn">
            <Button isRound>{ <FormattedMessage id={Message.LogIn} /> }</Button>
          </Link>
        </div>
        <div className="welcome-content__img"></div>
      </div>
    </div>
  );
};

