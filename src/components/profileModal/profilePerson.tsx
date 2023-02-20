import { UserIcon } from './../userIcon/userIcon';
import { User }  from '../../types/models';


export const ProfilePerson = ({ id, name, email }: User) => {
  return (
    <div className="modal-windows__person">
      <UserIcon userId={id}>{name}</UserIcon>
      <div className="modal-person__name-email">
        {<div className="modal-person__name">{name}</div>}
        <div className="modal-person__email">{email}</div>
      </div>
    </div>
  );
};