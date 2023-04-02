import './myTaskItem.scss';
import { MyTask } from '../../types/models';
import { NavLink } from 'react-router-dom';
import { formatDateString } from '../../utils/formatDate';

export const MyTaskItem = ({ task: { section, name, dueDate } }: { task: MyTask }) => {
  const { projectId, project: { name: projectName } } = section;
  return (
    <tr className="task-row">
      <td className="task-cell">
        <NavLink to={`/project/${projectId}`} className="task-link">{name}</NavLink>
      </td>
      <td className="task-cell task-project-cell">
        <NavLink to={`/project/${projectId}`}><span className="task-project-link">{projectName}</span></NavLink>
      </td>
      <td className="task-cell task-deadline-cell">{dueDate && formatDateString(dueDate, 'dd MMMM')}</td>
    </tr>
  );
};
