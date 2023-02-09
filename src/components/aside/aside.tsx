import './aside.scss';
import { useContext } from 'react';
import { ProjectsContext } from '../../context/projectsContext';


export const Aside = () => {
  const { projects } = useContext(ProjectsContext);

  return (
    <aside className="aside__container">
      <div className="aside__tasks-team">
        <div className="tasks-team">
          <div className="tasks-team__logo"></div>
          My team
          </div>
        </div>
        <div className="aside__projects">
          <div className="projects__my-projects">
          <span className="projects__logo"></span>
            My projects
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
