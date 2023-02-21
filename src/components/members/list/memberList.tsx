import { MemberIcon } from '../icon/memberIcon';
import './memberList.scss';
import { useState } from 'react';
import { AddMemberModal } from '../modal/addMemberModal';
import { useMembers } from '../../../hooks/members';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../languages/messages';
import { useTranslate } from '../../../hooks/useTranslate';
import { Member } from '../member';

export function MemberList() {
  const { trans } = useTranslate();
  const [addMemberModal, setAddMemberModal] = useState(false);
  const { getGroupedMembers } = useMembers();
  const members = getGroupedMembers();

  return (
    <>
      {addMemberModal && <AddMemberModal onClose={() => setAddMemberModal(false)} />}
      <section className="members">
        <p className="members__title"><FormattedMessage id={Message.Members} /> ({members.length})</p>
        <div className="members__list">
          {members.map((member) => <Member key={member.id} member={member} />)}
          <MemberIcon label={trans(Message.AddMember)} isNew onClick={() => setAddMemberModal(true)}></MemberIcon>
        </div>
      </section>
    </>
  );
}
