import { Errors, List, Response, TaskCreateData, TaskUpdateData } from '../API/types';
import { Task } from '../types/models';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { TaskService } from '../API/taskService';
import { useSections } from '../hooks/useSections';

export interface TasksContextValue {
  getTasks: (sectionId: string) => List<Task>
  createTask: (sectionId: string, data: TaskCreateData) => Promise<(Errors | null)>
  updateTask: (id: string, data: TaskUpdateData) => Promise<(Errors | null)>
  deleteTask: (id: string) => Promise<(Errors | null)>
  moveTask: (id: string, toSectionId: string, toIndex?: number) => Promise<(Errors | null)>
  getTasksAll: () => List<Task>
}

export const TasksContext = createContext<TasksContextValue>({
  getTasks: () => ({
    items: [],
    count: 0
  }),
  createTask: async () => null,
  updateTask: async () => null,
  deleteTask: async () => null,
  moveTask: async () => null,
  getTasksAll: () => ({
    items: [],
    count: 0
  }),
});

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<{ [key: string]: List<Task> }>({});
  const { sections } = useSections();

  const fetchTasks = useCallback(async (): Promise<void> => {
    const sectionIds = sections.items.map(({ id }) => id);
    const promises = sectionIds.reduce<Promise<Response<List<Task>>>[]>((acc, sectionId) => {
      return [...acc, TaskService.getTasks(sectionId)];
    }, []);

    const results = await Promise.all(promises);
    results.forEach(({ data: taskItems }, idx) => {
      setTasks(prev => ({ ...prev, [sectionIds[idx]]: taskItems }));
    });
  }, [sections]);

  const getTasks = (sectionId: string): List<Task> => {
    const { items, count } = tasks[sectionId] || { items: [], count: 0 };
    return {
      items: items,
      count
    };
  };

  const getTasksAll = (): List<Task> => {
    return Object.values(tasks).reduce((acc, task) => {
      acc.items = [...acc.items, ...task.items];
      acc.count = acc.count + task.count;
      return acc;
    }, {
      items: [],
      count: 0
    });
  };

  const getTask = (id: string): Task => {
    const task = Object.values(tasks).map(({ items }) => [...items]).flat().find(item => item.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  };

  const createTask = async (sectionId: string, data: TaskCreateData) => {
    try {
      const { data: taskItem, errors } = await TaskService.createTask(sectionId, data);
      if (errors) {
        return errors;
      }

      setTasks((prev) => {
        const { items, count } = prev[sectionId];
        return {
          ...prev,
          [sectionId]: {
            items: [...items, taskItem],
            count: count + 1
          }
        };
      });

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { data: { sectionId }, errors } = await TaskService.deleteTask(id);
      if (errors) {
        return errors;
      }

      setTasks((prev) => {
        const { items, count } = prev[sectionId];
        return {
          ...prev,
          [sectionId]: {
            items: items.filter((task) => task.id !== id),
            count: count - 1
          }
        };
      });

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const moveTask = async (taskId: string, toSectionId: string, toIndex?: number) => {
    try {
      const moveToIndex = toIndex ?? tasks[toSectionId].count;
      const taskItem = getTask(taskId);
      const { sectionId: fromSectionId } = taskItem;
      const fromIndex = tasks[fromSectionId].items.indexOf(taskItem);
      const isSameSection = fromSectionId === toSectionId;
      const isSamePosition = fromIndex === moveToIndex;

      if (isSameSection && isSamePosition) {
        return null;
      }

      setTasks((sectionsTasks) => {
        if (isSameSection) {
          const toSection = sectionsTasks[fromSectionId];
          const sectionItems = [...toSection.items];
          const [movedTask] = sectionItems.splice(fromIndex, 1);
          sectionItems.splice(moveToIndex, 0, movedTask);

          return {
            ...sectionsTasks,
            [toSectionId]: {
              ...toSection,
              items: sectionItems,
            },
          };
        }

        const fromSection = sectionsTasks[fromSectionId];
        const toSection = sectionsTasks[toSectionId];
        const fromSectionItems = [...fromSection.items];
        const toSectionItems = [...toSection.items];
        const [movedTask] = fromSectionItems.splice(fromIndex, 1);
        toSectionItems.splice(moveToIndex, 0, { ...movedTask, sectionId: toSectionId });

        return {
          ...sectionsTasks,
          [fromSectionId]: {
            ...fromSection,
            items: fromSectionItems,
          },
          [toSectionId]: {
            ...toSection,
            items: toSectionItems,
          },
        };
      });

      const { errors } = await TaskService.moveTask(taskId, toSectionId, moveToIndex + 1);
      return errors;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const updateTask = async (id: string, data: TaskUpdateData) => {
    try {
      const { data: taskItem, errors } = await TaskService.updateTask(id, data);
      if (errors) {
        return errors;
      }

      console.log(taskItem);

      setTasks((prev) => {
        const { sectionId } = taskItem;
        const { items, count } = prev[sectionId];
        return {
          ...prev,
          [sectionId]: {
            items: items.map((el) => el.id === taskItem.id ? taskItem : el),
            count: count + 1
          }
        };
      });

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TasksContext.Provider value={{ getTasks, getTasksAll, createTask, updateTask, deleteTask, moveTask }}>{children}</TasksContext.Provider>
  );
};