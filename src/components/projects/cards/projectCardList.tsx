import './projectCardList.scss';
import { useProjects } from '../../../hooks/projects';

interface ProjectCardListProps {
  onCreate: () => void
}

export function ProjectCardList({ onCreate }: ProjectCardListProps) {
  const { projects, count } = useProjects();

  return (
    <div className="projects-cards wrapper">
      <h4>Your projects ({count})</h4>
      <div className="projects-cards__list">
        {projects.map(({ id, name }) => (
          <div key={id} className="projects-cards__item">{name}</div>
        ))
        }
        <div className="projects-cards__create" onClick={onCreate}>+ Create new project</div>
      </div>
    </div>
  );
}
