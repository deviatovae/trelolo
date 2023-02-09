import { MemberIcon } from '../icon/memberIcon';
import './memberList.scss';
import { useState } from 'react';
import { AddMemberModal } from '../modal/addMemberModal';

export function MemberList() {
  const [addMemberModal, setAddMemberModal] = useState(false);

  return (
    <>
      {addMemberModal && <AddMemberModal onClose={() => setAddMemberModal(false)}/>}
      <section className="members">
        <p className="members__title">Members(2)</p>
        <div className="members__list">
          <MemberIcon label="Aleksei" isOwner>AK</MemberIcon>
          <MemberIcon label="Kira">KZ</MemberIcon>
          <MemberIcon label="Add member" isNew onClick={() => setAddMemberModal(true)}></MemberIcon>
        </div>
      </section>
    </>
  );
}
