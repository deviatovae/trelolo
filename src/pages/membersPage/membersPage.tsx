import Aside from '../../components/aside/aside';
import './membersPage.scss';
import { MemberList } from '../../components/members/list/memberList';
import { ProjectList } from '../../components/projects/list/projectList';
import { MembersProvider } from '../../context/membersContext';
import { ProjectsProvider } from '../../context/projectsContext';
import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { useProjects } from '../../hooks/projects';
import { useMembers } from '../../hooks/members';
import { MemberPageContent } from './memberPageContent';






export const MembersPage = () => {

  // const { isFetchingProject } = useProjects();
  // const { isFetchingMembers } = useMembers();

  // console.log(isFetchingProject, isFetchingMembers);

  return (
    <div className="members-page__container">
      <ProjectsProvider>
        <Aside/>
        <div className="members-page__content">
          <MembersProvider>
            <MemberPageContent />
          </MembersProvider>
        </div>
      </ProjectsProvider>
    </div>
  );
};
