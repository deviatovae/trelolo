import './projectCardList.scss';
import { useProjects } from '../../../hooks/projects';
import React, { useState } from 'react';
import { Errors } from '../../../API/types';
import { ProjectCard } from './projectCard';
import { ProjectCreateCard } from './projectCreateCard';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../languages/messages';
import { PreloaderCircle } from '../../../components/preloader/preloaderCircle';


export function ProjectCardList() {
  const { projects, count, addProject, isFetchingProject } = useProjects();
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
    <>
      {isFetchingProject && <PreloaderCircle />}
      {!isFetchingProject &&
          <div className="projects-cards__container">
              <div className="projects-cards__content">
                  <h4><FormattedMessage id={Message.ManageProjects} /> ({count})</h4>
                  <div className="projects-cards__list">
                    {!showCreate && <div className="projects-cards__create" onClick={onClickCreate}>+ <FormattedMessage id={Message.CreateNewProject} /></div>}
                    {showCreate && <ProjectCreateCard onClose={close} onCreate={onCreateProject} errors={errors} />}
                    {projects.map(({ id, name }) => <ProjectCard key={id} id={id} name={name} />)}
                  </div>
              </div>
          </div>
      }
    </>
  );
}
