import { MemberIcon } from './icon/memberIcon';
import { getInitials, getName } from '../../utils/format';
import { UserWithMembers } from '../../types/models';
import { useAuth } from '../../hooks/auth';
import { UpdateMemberModal } from './modal/updateMemberModal';
import { useState } from 'react';


interface MemberProps {
  member: UserWithMembers
}

export const Member = ({ member: { id, name, email, members } }: MemberProps) => {
  const { userInfo: currentUser } = useAuth();
  const [showUpdate, setShowUpdate] = useState(false);
  const isOwner = id === currentUser?.id;

  return (
    <>
      <MemberIcon label={getName(name)} isOwner={isOwner} onClick={() => setShowUpdate(true)}>
        {getInitials(name)}
      </MemberIcon>
      {showUpdate && <UpdateMemberModal email={email} members={members} onClose={() => setShowUpdate(false)} />}
    </>
  );
};
