import { Errors, List, TaskCreateData } from '../API/types';
import { Task } from '../types/models';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { TaskService } from '../API/taskService';

export interface TasksContextValue {
  tasks: List<Task>
  createTask: (data: TaskCreateData ) => Promise<(Errors | null)>
  deleteTask: (id: string) => Promise<(Errors | null)>
  updateTask: (id: string, taskInfo: Task) => Promise<(Errors | null)>
}

export const TasksContext = createContext<TasksContextValue>({
  tasks: {
    items: [],
    count: 0,
  },
  createTask: async () => null,
  deleteTask: async () => null,
  updateTask: async () => null
});


export const TasksProvider = ({ children, sectionId }: { sectionId: string, children: ReactNode }) => {
  const [tasks, setTasks] = useState<List<Task>>({
    items: [],
    count: 0
  });

  const fetchTasks = useCallback(async (): Promise<Errors | null> => {
    try {
      const { data: taskItems, errors } = await TaskService.getTasks(sectionId);
      if (errors) {
        return errors;
      }

      setTasks(taskItems);

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  }, [sectionId]);

  const createTask = async (data: TaskCreateData) => {
    try {
      const { data: taskItem, errors } = await TaskService.createTask(sectionId, data);
      if (errors) {
        return errors;
      }

      setTasks(({ items, count }) => ({
        items: [...items, taskItem],
        count: count + 1,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { errors } = await TaskService.deleteTask(id);
      if (errors) {
        return errors;
      }

      setTasks(({ items, count }) => ({
        items: items.filter((task) => task.id !== id),
        count: count - 1,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const updateTask = async (id: string, taskInfo: Task) => {
    try {
      const { data: taskItem, errors } = await TaskService.updateTask(id, taskInfo);
      if (errors) {
        return errors;
      }

      setTasks(({ items, count }) => ({
        items: items.map((task) => task.id === taskItem.id ? taskItem : task),
        count: count,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>{children}</TasksContext.Provider>
  );
};
