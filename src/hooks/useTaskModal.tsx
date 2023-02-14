import { useContext } from 'react';
import { TaskModalContext } from '../context/taskModalContext';

export const useTaskModal = () => {
  return useContext(TaskModalContext);
};
