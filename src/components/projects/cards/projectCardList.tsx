import './projectCardList.scss';
import { useProjects } from '../../../hooks/projects';
import React, { useState } from 'react';
import { Errors } from '../../../API/types';
import { ProjectCard } from './projectCard';
import { ProjectCreateCard } from './projectCreateCard';

export function ProjectCardList() {
  const { projects, count, addProject } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const close = () => {
    setShowCreate(false);
    setErrors(null);
  };

  const onCreateProject = async (name: string) => {
    await addProject({ name });
    close();
  };

  const onClickCreate = () => {
    setShowCreate(true);
  };

  return (
    <div className="projects-cards wrapper">
      <h4>Your projects ({count})</h4>
      <div className="projects-cards__list">
        {projects.map(({ id, name }) => <ProjectCard key={id} id={id} name={name} />)}
        <div className="projects-cards__create" onClick={onClickCreate}>+ Create new project</div>
      </div>
      {showCreate && <ProjectCreateCard onClose={close} onCreate={onCreateProject} errors={errors} />}
    </div>
  );
}
