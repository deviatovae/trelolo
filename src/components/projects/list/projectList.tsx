import './projectList.scss';
import { UserIcon } from '../../userIcon/userIcon';
import { IconColorProvider } from '../../../utils/iconColorProvider';
import { useProjects } from '../../../hooks/projects';
import { useMembers } from '../../../hooks/members';

export function ProjectList() {
  const { projects, count } = useProjects();
  const { members: { items: members } } = useMembers();

  return (
    <section className="members-page__projects projects">
      <p className="projects__title">Projects({count})</p>
      <div className="projects__row project-row">
        <div className="project-row__icon_new"></div>
        <span className="project-row__name_new">New project</span>
      </div>
      {projects.map(({ id, name }) => (
        <div className="projects__row project-row" key={id}>
          <div className="project-row__icon"></div>
          <span className="project-row__name">{name}</span>
          <ul className="project-row__members row-members">
            {members.filter(({ project: { id: projectId } }) => projectId === id).map(({ id: memberId, user: { name: userName } }) => (
              <li key={memberId} className="row-members__member">
                <UserIcon bgColor={IconColorProvider.getColor()}>{userName}</UserIcon>
              </li>)
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}
