import './projectPage.scss';
import '../../components/sections/section.scss';
import Aside from '../../components/aside/aside';
import { ProjectsProvider } from '../../context/projectsContext';
import { useParams } from 'react-router-dom';
import { SectionsProvider } from '../../context/sectionsContext';
import { MembersProvider } from '../../context/membersContext';
import { Sections } from '../../components/sections/sections';

export const ProjectPage = () => {
  const { id: projectId } = useParams();

  return (
    <ProjectsProvider>
      <div className="project-page__container wrapper">
        <Aside></Aside>
        <SectionsProvider projectId={projectId || ''}>
          <MembersProvider projectId={projectId}>
            <Sections />
          </MembersProvider>
        </SectionsProvider>
      </div>
    </ProjectsProvider>
  );
};
