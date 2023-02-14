import './projectPage.scss';
import '../../components/sections/section.scss';
import Aside from '../../components/aside/aside';
import { ProjectsProvider } from '../../context/projectsContext';
import { useParams } from 'react-router-dom';
import { SectionsProvider } from '../../context/sectionsContext';
import { Sections } from '../../components/sections/sections';
import { MembersProvider } from '../../context/membersContext';

export const ProjectPage = () => {
  const { id: projectId } = useParams();

  return (
    <ProjectsProvider>
      <div className="project-page__container wrapper">
        <Aside></Aside>
        <SectionsProvider projectId={projectId || ''}>
          {/* todo: заменить на MemberProvider, который получает мемберов только для текущего проекта */}
          <MembersProvider>
            <Sections />
          </MembersProvider>
        </SectionsProvider>
      </div>
    </ProjectsProvider>
  );
};
