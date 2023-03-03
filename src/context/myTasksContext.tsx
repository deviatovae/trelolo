import { List } from '../API/types';
import { MyTask } from '../types/models';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { castToErrors, errorsToString } from '../utils/errors';
import { TaskService } from '../API/taskService';

export interface MyTasksContextValue {
  allTasks: List<MyTask>
  myTasks: List<MyTask>
  isMyTasksFetching: boolean
}

export const MyTasksContext = createContext<MyTasksContextValue>({
  allTasks: { items: [], count: 0 },
  myTasks: { items: [], count: 0 },
  isMyTasksFetching: true,
});

export const MyTasksProvider = ({ children }: { children: ReactNode }) => {
  const [myTasks, setMyTasks] = useState<List<MyTask>>({ items: [], count: 0 });
  const [allTasks, setAllTasks] = useState<List<MyTask>>({ items: [], count: 0 });
  const [isMyTasksFetching, setIsMyTasksFetching] = useState(true);

  useEffect(() => {
    const fetchTasks = () => {
      const logErrors = (e: unknown) => console.error(errorsToString(castToErrors(e)));
      const promises = [
        TaskService.getAllTasks().then(({ data }) => setAllTasks(data)).catch(logErrors),
        TaskService.getAllTasks(true).then(({ data }) => setMyTasks(data)).catch(logErrors),
      ];
      Promise.all(promises).then(() => setIsMyTasksFetching(false));
    };
    fetchTasks();
  }, []);

  return (
    <MyTasksContext.Provider value={{ myTasks, allTasks, isMyTasksFetching }}>{children}</MyTasksContext.Provider>
  );
};
