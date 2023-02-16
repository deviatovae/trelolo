import './myTasks.scss';
import { useEffect, useState } from 'react';
import { MyTask } from '../../types/models';
import { castToErrors, errorsToString } from '../../utils/errors';
import { TaskService } from '../../API/taskService';
import { MyTaskItem } from './myTaskItem';
import { List } from '../../API/types';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';

export const MyTasks = () => {
  const { trans } = useTranslate();
  const [showAssignedToMe, setAssignedToMe] = useState(false);
  const [allTasks, setAllTasks] = useState<List<MyTask>>({
    items: [],
    count: 0
  });
  const [myTasks, setMyTasks] = useState<List<MyTask>>({
    items: [],
    count: 0
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const logErrors = (e: unknown) => console.error(errorsToString(castToErrors(e)));
      TaskService.getAllTasks().then(({ data }) => setAllTasks(data)).catch(logErrors);
      TaskService.getAllTasks(true).then(({ data }) => setMyTasks(data)).catch(logErrors);
    };
    fetchTasks();
  });

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
