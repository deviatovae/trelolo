import { useContext } from 'react';
import { MyTasksContext } from '../context/myTasksContext';

export const useMyTasks = () => useContext(MyTasksContext);
