import Aside from '../../components/aside/aside';
import './membersPage.scss';
import { MemberList } from '../../components/members/list/memberList';
import { ProjectList } from '../../components/projects/list/projectList';
import { MembersProvider } from '../../context/membersContext';

export const MembersPage = () => {
  return (
    <div className="members-page__container">
        <Aside></Aside>
        <div className="members-page__content">
          <MembersProvider>
            <MemberList/>
            <ProjectList/>
          </MembersProvider>
        </div>
    </div>
  );
};
