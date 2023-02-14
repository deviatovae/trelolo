import { Task } from '../types/models';
import React, { createContext, ReactNode, useState } from 'react';
import { TaskModal } from '../components/taskModal/taskModal';

interface TaskModalContextValue {
  showTaskModal: (task: Task) => void
  closeTaskModal: () => void
}

export const TaskModalContext = createContext<TaskModalContextValue>({
  showTaskModal: () => null,
  closeTaskModal: () => null,
});

export const TaskModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const show = (shownTask: Task) => {
    setTask(shownTask);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <TaskModalContext.Provider value={{ showTaskModal: show, closeTaskModal: close }}>
      {children}
      {isOpen && task && <TaskModal task={task} onClose={close}></TaskModal>}
    </TaskModalContext.Provider>
  );
};
