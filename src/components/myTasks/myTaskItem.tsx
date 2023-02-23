import './myTaskItem.scss';
import { MyTask } from '../../types/models';
import { NavLink } from 'react-router-dom';
import { formatDateString } from '../../utils/formatDate';

export const MyTaskItem = ({ task: { section, name, dueDate } }: { task: MyTask }) => {
  const { projectId, project: { name: projectName } } = section;
  return (
    // <div className="my-tasks-task-list__item">
    //   <NavLink to={`/project/${projectId}`} className="my-tasks-task-list__name">{name}</NavLink>
    //   <div>
    //     <NavLink to={`/project/${projectId}`}><span className="my-tasks-task-list__project">{projectName}</span></NavLink>
    //     <span className="my-tasks-task-list__dueDate">{dueDate && formatDateString(dueDate, 'dd MMM')}</span>
    //   </div>
    // </div>
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
