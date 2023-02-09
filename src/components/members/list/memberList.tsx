import { MemberIcon } from '../icon/memberIcon';
import './memberList.scss';

export function MemberList() {
  return (
    <section className="members">
      <p className="members__title">Members(2)</p>
      <div className="members__list">
        <MemberIcon label="Aleksei" isOwner>AK</MemberIcon>
        <MemberIcon label="Kira">KZ</MemberIcon>
        <MemberIcon label="Add member" isNew></MemberIcon>
      </div>
    </section>
  );
}
