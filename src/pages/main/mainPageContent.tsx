import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { MyTasks } from '../../components/myTasks/myTasks';
import React from 'react';
import { useMyTasks } from '../../hooks/useMyTasks';

export const MainPageContent = () => {
  const { isMyTasksFetching } = useMyTasks();

  return (
    <PreloaderCircle isLoading={isMyTasksFetching}>
      <MyTasks />
    </PreloaderCircle>
  );
};
