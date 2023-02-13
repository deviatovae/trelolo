import './projectList.scss';
import { UserIcon } from '../../userIcon/userIcon';
import { useProjects } from '../../../hooks/projects';
import { useMembers } from '../../../hooks/members';
import { useTranslate } from '../../../hooks/useTranslate';
import { Message } from '../../languages/messages';

export function ProjectList() {
  const { trans } = useTranslate();
  const { projects, count } = useProjects();
  const { members: { items: members } } = useMembers();

  return (
    <section className="members-page__projects projects">
      <p className="projects__title">{trans(Message.Projects)}({count})</p>
      <div className="projects__row project-row">
        <div className="project-row__icon_new"></div>
        <span className="project-row__name_new">{trans(Message.CreateNewProjectShort)}</span>
      </div>
      {projects.map(({ id, name }) => (
        <div className="projects__row project-row" key={id}>
          <div className="project-row__icon"></div>
          <span className="project-row__name">{name}</span>
          <ul className="project-row__members row-members">
            {members
              .filter(({ project: { id: projectId } }) => projectId === id)
              .map(({ id: memberId, user: { id: userId, name: userName } }) => (
                <li key={memberId} className="row-members__member">
                  <UserIcon userId={userId}>{userName}</UserIcon>
                </li>)
              )}
          </ul>
        </div>
      ))}
    </section>
  );
}
