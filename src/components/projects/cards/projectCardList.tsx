import './projectCardList.scss';
import { useProjects } from '../../../hooks/projects';
import React, { useState } from 'react';
import { MainModal } from '../../mainModal/mainModal';

export function ProjectCardList() {
  const { projects, count, addProject } = useProjects();
  const [showCreate, setShowCreate] = useState(false);

  const handleModalClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setShowCreate(false);
    }
  };

  const onCreateProject = async (name: string) => {
    await addProject({ name });
    setShowCreate(false);
  };

  return (
    <div className="projects-cards wrapper">
      <h4>Your projects ({count})</h4>
      <div className="projects-cards__list">
        {projects.map(({ id, name }) => (
          <div key={id} className="projects-cards__item">{name}
            <div className="projects-cards__edit"></div>
            <div className="projects-cards__delete"></div>
          </div>
        ))}
        <div className="projects-cards__create" onClick={() => setShowCreate(true)}>+ Create new project</div>
      </div>
      {showCreate && (
        <MainModal ShowModal={showCreate} onClickOutside={handleModalClickOutside} onCreateProject={onCreateProject} />
      )}
    </div>
  );
}
