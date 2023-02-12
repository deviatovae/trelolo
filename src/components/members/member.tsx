import { MemberIcon } from './icon/memberIcon';
import { getInitials, getName } from '../../utils/format';
import { UserMembers } from '../../types/models';
import { useAuth } from '../../hooks/auth';
import { UpdateMemberModal } from './modal/updateMemberModal';
import { useState } from 'react';


interface MemberProps {
  member: UserMembers
}

export const Member = ({ member: { id, name, email, members } }: MemberProps) => {
  const { userInfo: currentUser } = useAuth();
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <>
      <MemberIcon label={getName(name)} isOwner={id === currentUser?.id} onClick={() => setShowUpdate(true)}>
        {getInitials(name)}
      </MemberIcon>
      {showUpdate && <UpdateMemberModal email={email} members={members} onClose={() => setShowUpdate(false)} />}
    </>
  );
};