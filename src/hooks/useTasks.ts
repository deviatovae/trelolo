import { useContext } from 'react';
import { TasksContext } from '../context/tasksContext';

export const useTasks = () => useContext(TasksContext);
