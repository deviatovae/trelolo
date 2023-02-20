import './membersPage.scss';
import { MembersProvider } from '../../context/membersContext';
import { ProjectsProvider } from '../../context/projectsContext';
import { MemberPageContent } from './memberPageContent';

export const MembersPage = () => {

  return (
    <>
      <ProjectsProvider>
        <div className="members-page__content">
          <MembersProvider>
            <MemberPageContent />
          </MembersProvider>
        </div>
      </ProjectsProvider>
    </>
  );
};
