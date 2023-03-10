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
  isTasksFetching: boolean
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
  isTasksFetching: true,
});

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<{ [key: string]: List<Task> }>({});
  const { sections, isFetchingSection } = useSections();
  const [isTasksFetching, setIsTasksFetching] = useState(true);

  const fetchTasks = useCallback(async (): Promise<void> => {
    const sectionIds = sections.items.map(({ id }) => id);
    const promises = sectionIds.reduce<Promise<Response<List<Task>>>[]>((acc, sectionId) => {
      return [...acc, TaskService.getTasks(sectionId)];
    }, []);

    const results = await Promise.all(promises);
    results.forEach(({ data: taskItems }, idx) => {
      setTasks(prev => ({ ...prev, [sectionIds[idx]]: taskItems }));
    });
    setIsTasksFetching(isFetchingSection || false);
  }, [isFetchingSection, sections.items]);

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

  const getTask = (id: string, fromTaskList?: { [key: string]: List<Task> }): Task => {
    const task = Object.values(fromTaskList || tasks).map(({ items }) => [...items]).flat().find(item => item.id === id);
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
            items: [...items, { ...taskItem, assignees: [] }],
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
      setTasks((sectionsTasks) => {
        const taskItem = getTask(taskId, sectionsTasks);
        const moveToIndex = toIndex ?? sectionsTasks[toSectionId].count;
        const { sectionId: fromSectionId } = taskItem;
        const fromIndex = sectionsTasks[fromSectionId].items.indexOf(taskItem);
        const isSameSection = fromSectionId === toSectionId;
        const isSamePosition = fromIndex === moveToIndex;

        if (fromIndex < 0) {
          throw new Error('Current position is incorrect');
        }

        if (isSameSection && isSamePosition) {
          return { ...sectionsTasks };
        }

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

      const { errors } = await TaskService.moveTask(taskId, toSectionId, toIndex === undefined ? toIndex : toIndex + 1);
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
    <TasksContext.Provider value={{ getTasks, getTasksAll, createTask, updateTask, deleteTask, moveTask, isTasksFetching }}>{children}</TasksContext.Provider>
  );
};
