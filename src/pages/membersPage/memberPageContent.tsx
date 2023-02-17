import { PreloaderCircle } from '../../components/preloader/preloaderCircle';
import { useProjects } from '../../hooks/projects';
import { useMembers } from '../../hooks/members';
import { MemberList } from '../../components/members/list/memberList';
import { ProjectList } from '../../components/projects/list/projectList';

export const MemberPageContent = () => {
  const { isFetchingProject } = useProjects();
  const { isFetchingMembers } = useMembers();

  return (
    <PreloaderCircle isLoading={isFetchingProject || isFetchingMembers}>
      <MemberList />
      <ProjectList />
    </PreloaderCircle>
  );
};
