import React from 'react';
import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { useProjects } from '../../hooks/projects';
import { ProjectCardList } from '../../components/projects/cards/projectCardList';

export const MyProjectsPage = () => {
  const { isFetchingProject } = useProjects();
  return (
    <>
      <PreloaderCircle isLoading={isFetchingProject}>
        <ProjectCardList />
      </PreloaderCircle>
    </>
  );
};
