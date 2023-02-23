import './myTasks.scss';
import { useState } from 'react';
import { MyTaskItem } from './myTaskItem';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { useMyTasks } from '../../hooks/useMyTasks';
import Button from '../button/button';

export const MyTasks = () => {
  const { trans } = useTranslate();
  const [assignedToMe, setAssignedToMe] = useState(false);
  const { myTasks: { items: myTasksItems, count: myTasksCount }, allTasks: { items, count } } = useMyTasks();
  const [sortedItems, setSortedItems] = useState(items);
  const [sortedMyTasks, setSortedMyTasks] = useState(myTasksItems);
  const [nameSorted, setNameSorted] = useState(false);
  const [projectSorted, setProjectSorted] = useState(false);
  const [dueDateSorted, setDueDateSorted] = useState(false);

  const showAssignedToMe = () => {
    setAssignedToMe(true);
  };

  const showAllTasks = () => {
    setAssignedToMe(false);
  };

  const sortByName = () => {
    if (nameSorted) {
      setSortedItems(items.sort((rowA, rowB) => rowA.name > rowB.name ? -1 : 1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => rowA.name > rowB.name ? -1 : 1));
      setNameSorted(false);
    } else {
      setSortedItems(items.sort((rowA, rowB) => rowA.name > rowB.name ? 1 : -1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => rowA.name > rowB.name ? 1 : -1));
      setNameSorted(true);
    }
  };

  const sortByProject = () => {
    if (projectSorted) {
      setSortedItems(items.sort((rowA, rowB) => rowA.section.project > rowB.section.project ? -1 : 1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => rowA.section.project > rowB.section.project ? -1 : 1));
      setProjectSorted(false);
    } else {
      setSortedItems(items.sort((rowA, rowB) => rowA.section.project > rowB.section.project ? 1 : -1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => rowA.section.project > rowB.section.project ? 1 : -1));
      setProjectSorted(true);
    }
  };

  const sortByDueDate = () => {
    if (dueDateSorted) {
      setSortedItems(items.sort((rowA, rowB) => (rowA.dueDate || 0) > (rowB.dueDate || 0) ? -1 : 1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => (rowA.dueDate || 0) > (rowB.dueDate || 0) ? -1 : 1));
      setDueDateSorted(false);
    } else {
      setSortedItems(items.sort((rowA, rowB) => (rowA.dueDate || 0) > (rowB.dueDate || 0) ? 1 : -1));
      setSortedMyTasks(myTasksItems.sort((rowA, rowB) => (rowA.dueDate || 0) > (rowB.dueDate || 0) ? 1 : -1));
      setDueDateSorted(true);
    }
  };

  return (
    // <><div className="my-tasks__container">
    //   <div className="my-tasks__content my-tasks-content">
    //     <div className="my-tasks-content__header">
    //       <div className="my-tasks-content__tabs tabs-content">
    //         <span className="tabs-content__title">{trans(Message.MyTasks)}</span>
    //         <nav className="tabs-content__tabs-bar">
    //           <ul className="tabs-content__list">
    //             <li className="tabs-content__tab">
    //               <div className={`tabs-content__tab-link ${!assignedToMe ? 'active' : ''}`} onClick={() => setAssignedToMe(false)}>
    //                 {trans(Message.AllTasks)} ({count})
    //               </div>
    //             </li>
    //             <li className="tabs-content__tab">
    //               <div className={`tabs-content__tab-link ${assignedToMe ? 'active' : ''}`} onClick={() => setAssignedToMe(true)}>
    //                 {trans(Message.AssignedToMe)} ({myTasksCount})
    //               </div>
    //             </li>
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    //     {!assignedToMe && <div className="my-tasks-content__task-list my-tasks-task-list">
    //       {items.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
    //     </div>}
    //     {assignedToMe &&
    //       <div className="my-tasks-content__task-list my-tasks-task-list">
    //         {myTasksItems.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
    //       </div>}
    //   </div>
    // </div>

    <section className="my-tasks-section">
      <header className="my-tasks-header">
        <h1 className="my-tasks-title">{trans(Message.MyTasks)}</h1>
        <nav className="my-tasks-nav">
          <Button className={`my-tasks-tab ${!assignedToMe ? 'active' : ''}`} onClick={showAllTasks}>{trans(Message.AllTasks)} ({count})</Button>
          <Button className={`my-tasks-tab ${assignedToMe ? 'active' : ''}`} onClick={showAssignedToMe}>{trans(Message.AssignedToMe)} ({myTasksCount})</Button>
        </nav>
      </header>
      <div className="my-tasks-table-container">
        <table className="my-tasks-table">
          <thead className="my-tasks-table-head">
            <tr className="task-row task-main-row">
              <th className="task-column-name" onClick={sortByName}>{trans(Message.TaskName)} {!nameSorted ? '↓' : '↑'}</th>
              <th className="task-column-project" onClick={sortByProject}>{trans(Message.Project)} {!projectSorted ? '↓' : '↑'}</th>
              <th className="task-column-duedate" onClick={sortByDueDate}>{trans(Message.DueDate)} {!dueDateSorted ? '↓' : '↑'}</th>
            </tr>
          </thead>
          <tbody className="my-tasks-table-body">
            {!assignedToMe && sortedItems.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
            {!assignedToMe && !sortedItems.length && <span className="no-tasks">{trans(Message.NoTasks)}</span>}
            {assignedToMe && sortedMyTasks.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
            {assignedToMe && !sortedMyTasks.length && <span className="no-tasks">{trans(Message.NoTasks)}</span>}
          </tbody>
        </table>
      </div>
    </section>
  );
};
