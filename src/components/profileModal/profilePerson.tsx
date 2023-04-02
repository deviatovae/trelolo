import { User } from '../../types/models';
import { UserIcon } from '../userIcon/userIcon';

type ProfilePersonProps = {
  user: User
};
export const ProfilePerson = ({ user: { id, name, email, colorHue } }: ProfilePersonProps) => {
  return (
    <div className="modal-windows__person">
      <UserIcon userId={id} colorHue={colorHue}>{name}</UserIcon>
      <div className="modal-person__name-email">
        {<div className="modal-person__name">{name}</div>}
        <div className="modal-person__email">{email}</div>
      </div>
    </div>
  );
};
