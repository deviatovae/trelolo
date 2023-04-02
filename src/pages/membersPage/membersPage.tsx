import './membersPage.scss';
import { MembersProvider } from '../../context/membersContext';
import { MemberPageContent } from './memberPageContent';

export const MembersPage = () => {

  return (
    <div className="members-page__content">
      <MembersProvider>
        <MemberPageContent />
      </MembersProvider>
    </div>
  );
};
