import './aside.scss';
import { useProjects } from '../../hooks/projects';
import { FormattedMessage } from 'react-intl';
import { Message } from '../languages/messages';
import { Route } from '../../router/routes';
import { MenuLink } from '../menuLink/menuLink';
import { useState } from 'react';
import { CreateProjectModal } from './createProjectModal';


export const Aside = () => {
  const { projects } = useProjects();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <aside className="aside__container">
      <div className="aside__tasks-team">
        <MenuLink to={Route.MAIN}>
          <div className="tasks-home">
            <div className="tasks-home__icon"></div>
            <FormattedMessage id={Message.MyHome} />
          </div>
        </MenuLink>
        <MenuLink to={Route.MEMBERS}>
          <div className="tasks-team">
            <div className="tasks-team__logo"></div>
            <FormattedMessage id={Message.MyTeam} />
          </div>
        </MenuLink>
        <div className="aside__projects">
          <MenuLink to={Route.PROJECTS}>
            <div className="projects__my-projects">
              <span className="projects__logo"></span>
              <FormattedMessage id={Message.MyProjects} />
              <span className="projects__plus" onClick={() => setShowCreate(true)}></span>
              {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)}></CreateProjectModal>}
            </div>
          </MenuLink>
          <ul className="projects__list">
            {projects.map(({ name, id }) => <li className="" key={id}>
              <MenuLink className="projects__item" to={`/project/${id}`}>
                {name}
              </MenuLink>
            </li>)}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
