import './projectPage.scss';
import '../../components/sections/section.scss';
import { useParams } from 'react-router-dom';
import { SectionsProvider } from '../../context/sectionsContext';
import { MembersProvider } from '../../context/membersContext';
import { Sections } from '../../components/sections/sections';
import { TasksProvider } from '../../context/tasksContext';

export const ProjectPage = () => {
  const { id: projectId } = useParams();

  return (
    <div className="project-page__container">
      <SectionsProvider projectId={projectId || ''}>
        <TasksProvider>
          <MembersProvider projectId={projectId}>
            <Sections />
          </MembersProvider>
        </TasksProvider>
      </SectionsProvider>
    </div>
  );
};
