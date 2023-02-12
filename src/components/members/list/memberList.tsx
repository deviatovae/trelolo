import { MemberIcon } from '../icon/memberIcon';
import './memberList.scss';
import { useState } from 'react';
import { AddMemberModal } from '../modal/addMemberModal';
import { useMembers } from '../../../hooks/members';
import { getInitials, getName } from '../../../utils/format';
import { useAuth } from '../../../hooks/auth';
import { FormattedMessage } from 'react-intl';
import { Message } from '../../languages/messages';
import { useTranslate } from '../../../hooks/useTranslate';

export function MemberList() {
  const { trans } = useTranslate();
  const [addMemberModal, setAddMemberModal] = useState(false);
  const { members: { items: members, count } } = useMembers();
  const { userInfo } = useAuth();

  return (
    <>
      {addMemberModal && <AddMemberModal onClose={() => setAddMemberModal(false)} />}
      <section className="members">
        <p className="members__title"><FormattedMessage id={Message.Members} />({count})</p>
        <div className="members__list">
          {members.map(({ id, user: { id: userId, name } }) => (
            <MemberIcon key={id} label={getName(name)} isOwner={userId === userInfo?.id}>{getInitials(name)}</MemberIcon>)
          )}
          <MemberIcon label={trans(Message.AddMember)} isNew onClick={() => setAddMemberModal(true)}></MemberIcon>
        </div>
      </section>
    </>
  );
}
