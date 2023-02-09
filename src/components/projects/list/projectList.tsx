import './projectList.scss';
import { useContext } from 'react';
import { ProjectsContext } from '../../../context/projectsContext';
import { UserIcon } from '../../userIcon/userIcon';
import { IconColorProvider } from '../../../utils/iconColorProvider';

export function ProjectList() {

  const { projects } = useContext(ProjectsContext);

  return (
    <section className="members-page__projects projects">
      <p className="projects__title">Projects(1)</p>
      <div className="projects__row project-row">
        <div className="project-row__icon_new"></div>
        <span className="project-row__name_new">New project</span>
      </div>
      {projects.map(({ id, name }) => (
        <div className="projects__row project-row" key={id}>
          <div className="project-row__icon"></div>
          <span className="project-row__name">{name}</span>
          <ul className="project-row__members row-members">
            <li className="row-members__member">
              <UserIcon bgColor={IconColorProvider.getColor()}>KZ</UserIcon>
            </li>
            <li className="row-members__member">
              <UserIcon bgColor={IconColorProvider.getColor()}>AD</UserIcon>
            </li>
            <li className="row-members__member">
              <UserIcon bgColor={IconColorProvider.getColor()}>AK</UserIcon>
            </li>
          </ul>
        </div>
      ))}
    </section>
  );
}
