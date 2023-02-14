import { UserIcon } from '../userIcon/userIcon';
import './comment.scss';
import './types';
import { CommentProp } from './types';

export default function Comment({ className, text, id, name }: CommentProp) {
  const classes = `comment ${className}`;

  return <div className={classes}>
    {name && <UserIcon userId={id}>{name}</UserIcon>}
    <div className="comment-info">
      <div className='comment-name-time'>
        {<span className="comment-name">{name}</span>}
        <span className="comment-time">5 minutes ago</span>
      </div>
      <p className="comment-text">{text}</p>
    </div>

  </div>;
}