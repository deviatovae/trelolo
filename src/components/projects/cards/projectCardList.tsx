import './projectCardList.scss';
import { useProjects } from '../../../hooks/projects';
import React, { useState } from 'react';
import { Errors } from '../../../API/types';
import { ProjectCard } from './projectCard';
import { ProjectCreateCard } from './projectCreateCard';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../languages/messages';
import { useTranslate } from '../../../hooks/useTranslate';


export function ProjectCardList() {
  const { addProject, getMyProjects, getTeamProjects } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const { trans } = useTranslate();
  const [showTeamProjects, setTeamProjects] = useState(false);
  const myProjects = getMyProjects();
  const teamProjects = getTeamProjects();
  const projects = showTeamProjects ? teamProjects : myProjects;

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
    <div className="myProjects-container">
      <div className="projects-cards__container">
        <div className="projects-cards__content">
          <div className="projects-cards__header">
            <h4 className={`tabs-content__tab-link ${!showTeamProjects ? 'active' : ''}`}
                onClick={() => setTeamProjects(false)}>{trans(Message.ManageProjects)}({myProjects.length})
            </h4>
            <h4 className={`tabs-content__tab-link ${showTeamProjects ? 'active' : ''}`}
                onClick={() => setTeamProjects(true)}>{trans(Message.TeamProjects)}({teamProjects.length})
            </h4>
          </div>
          {!showTeamProjects && <h6>{trans(Message.ManageProjectsDescription)}</h6>}
          {showTeamProjects && <h6>{trans(Message.TeamProjectsDescription)}</h6>}
          <div className="projects-cards__list">
            {!showCreate && !showTeamProjects &&
                <div className="projects-cards__create" onClick={onClickCreate}>+ <FormattedMessage id={Message.CreateNewProject} /></div>}
            {showCreate && <ProjectCreateCard onClose={close} onCreate={onCreateProject} errors={errors} />}
            {projects.map(({ id, name }) => <ProjectCard key={id} id={id} name={name} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
