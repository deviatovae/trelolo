import React, { useState } from 'react';
import { ProjectUpdateCard } from './projectUpdateCard';
import { Errors } from '../../../API/types';
import { useProjects } from '../../../hooks/projects';
import { ProjectDeleteCard } from './projectDeleteCard';

interface ProjectCardProps {
  id: string
  name: string
}

export const ProjectCard = ({ name, id }: ProjectCardProps) => {
  const { getProject, updateProject, deleteProject } = useProjects();

  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const project = getProject(id);

  const close = () => {
    setShowUpdate(false);
    setShowDelete(false);
    setErrors(null);
  };

  const onUpdateProject = async (updatedName: string) => {
    if (!project?.id) {
      return;
    }
    const responseErrors = await updateProject(project.id, { name: updatedName });
    if (responseErrors) {
      return setErrors(responseErrors);
    }
    close();
  };

  const onDeleteProject = async () => {
    if (!project?.id) {
      return;
    }
    await deleteProject(project.id);
    close();
  };

  return (
    <>
      {!showUpdate && !showDelete && (
        <div className="projects-cards__item">{name}
          <div className="projects-cards__edit" onClick={() => setShowUpdate(true)}></div>
          <div className="projects-cards__delete" onClick={() => setShowDelete(true)}></div>
        </div>
      )}
      {showUpdate && project && <ProjectUpdateCard project={project} onClose={close} onUpdate={onUpdateProject} errors={errors} />}
      {showDelete && project && <ProjectDeleteCard project={project} onClose={close} onDelete={onDeleteProject} errors={errors} />}
    </>
  );
};
