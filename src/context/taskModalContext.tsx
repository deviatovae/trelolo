import { Task } from '../types/models';
import React, { createContext, ReactNode, useState } from 'react';
import { TaskModal } from '../components/taskModal/taskModal';
import { TasksContextValue } from './tasksContext';
import { CommentsProvider } from './commentsContext';

interface TaskModalContextValue {
  showTaskModal: (task: Task, context: TasksContextValue) => void
  closeTaskModal: () => void
}

export const TaskModalContext = createContext<TaskModalContextValue>({
  showTaskModal: () => null,
  closeTaskModal: () => null,
});

export const TaskModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<{ task: Task, context: TasksContextValue } | null>(null);

  const show = (shownTask: Task, context: TasksContextValue) => {
    setTask({ task: shownTask, context });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <TaskModalContext.Provider value={{ showTaskModal: show, closeTaskModal: close }}>
      {children}
      {isOpen && task && <CommentsProvider>
        <TaskModal task={task.task} context={task.context} onClose={close}></TaskModal>
        </CommentsProvider>}
    </TaskModalContext.Provider>
  );
};
