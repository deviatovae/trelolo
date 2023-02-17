import './myTasks.scss';
import { useState } from 'react';
import { MyTaskItem } from './myTaskItem';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { useMyTasks } from '../../hooks/useMyTasks';

export const MyTasks = () => {
  const { trans } = useTranslate();
  const [showAssignedToMe, setAssignedToMe] = useState(false);
  const { myTasks, allTasks } = useMyTasks();

  return (
    <div className="my-tasks__container">
      <div className="my-tasks__content my-tasks-content">
        <div className="my-tasks-content__header">
          <div className="my-tasks-content__tabs tabs-content">
            <span className="tabs-content__title">{trans(Message.MyTasks)}</span>
            <nav className="tabs-content__tabs-bar">
              <ul className="tabs-content__list">
                <li className="tabs-content__tab">
                  <div className={`tabs-content__tab-link ${!showAssignedToMe ? 'active' : ''}`} onClick={() => setAssignedToMe(false)}>
                    {trans(Message.AllTasks)} ({allTasks.count})
                  </div>
                </li>
                <li className="tabs-content__tab">
                  <div className={`tabs-content__tab-link ${showAssignedToMe ? 'active' : ''}`} onClick={() => setAssignedToMe(true)}>
                    {trans(Message.AssignedToMe)} ({myTasks.count})
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {!showAssignedToMe && <div className="my-tasks-content__task-list my-tasks-task-list">
          {allTasks.items.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
        </div>}
        {showAssignedToMe &&
            <div className="my-tasks-content__task-list my-tasks-task-list">
              {myTasks.items.map(task => <MyTaskItem key={task.id} task={task}></MyTaskItem>)}
            </div>}
      </div>
    </div>
  );
};
