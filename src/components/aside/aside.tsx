import './aside.scss';
import { useProjects } from '../../hooks/projects';
import { FormattedMessage } from 'react-intl';
import { Message } from '../languages/messages';


export const Aside = () => {
  const { projects } = useProjects();

  return (
    <aside className="aside__container">
      <div className="aside__tasks-team">
        <div className="tasks-team">
          <div className="tasks-team__logo"></div>
          <FormattedMessage id={Message.MyTeam} />
          </div>
        </div>
        <div className="aside__projects">
          <div className="projects__my-projects">
          <span className="projects__logo"></span>
            <FormattedMessage id={Message.MyProjects} />
            <span className="projects__plus">+</span>
          </div>
          <ul className="projects__list">
            {projects.map(({ name, id }) => <li className="projects__item" key={id}><span>{name}</span></li>)}
          </ul>
        </div>
    </aside>
  );
};

export default Aside;
