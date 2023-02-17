import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';
import { MyTasks } from '../../components/myTasks/myTasks';
import React from 'react';
import { useProjects } from '../../hooks/projects';
import { useMyTasks } from '../../hooks/useMyTasks';

export const MainPageContent = () => {
  const { isFetchingProject } = useProjects();
  const { isMyTasksFetching } = useMyTasks();

  return (
    <PreloaderCircle isLoading={isFetchingProject && isMyTasksFetching}>
      <ProjectCardList />
      <MyTasks />
    </PreloaderCircle>
  );
};
