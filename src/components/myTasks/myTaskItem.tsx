import './myTaskItem.scss';
import { MyTask } from '../../types/models';
import { NavLink } from 'react-router-dom';
import { formatDateString } from '../../utils/formatDate';

export const MyTaskItem = ({ task: { section, name, dueDate } }: { task: MyTask }) => {
  const { projectId, project: { name: projectName } } = section;
  return (
    <div className="my-tasks-task-list__item">
      <NavLink to={`/project/${projectId}`} className="my-tasks-task-list__name">{name}</NavLink>
      <div>
        <span className="my-tasks-task-list__project">{projectName}</span>
        <span className="my-tasks-task-list__dueDate">{dueDate && formatDateString(dueDate, 'dd MMM')}</span>
      </div>
    </div>
  );
};
