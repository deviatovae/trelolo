import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { formatDateString } from '../../utils/formatDate';
import Button from '../button/button';
import { Textearea } from '../textarea/textearea';
import { UserIcon } from '../userIcon/userIcon';
import './comment.scss';
import './types';
import { CommentProp } from './types';

export default function Comment({ className, text, userId, commentId, name, createdAt, deleteComment, editComment }: CommentProp) {

  const { userInfo } = useAuth();
  const [comment, setComment] = useState(text);
  const [editDisabled, setEditDisabled] = useState(true);

  const commentTextarea = useRef<HTMLTextAreaElement>(null);

  const classes = `comment ${className}`;

  const onClickDelete = () => {
    deleteComment(commentId);
  };

  const onClickEdit = () => {
    setEditDisabled(false);
  };

  useEffect(() => {
    if (!editDisabled && commentTextarea.current) {
      commentTextarea.current.focus();
    }
  }, [editDisabled]);

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onClickLike = () => {

  };

  const onClickSubmitEdit = () => {
    editComment(commentId, comment);
    setEditDisabled(true);
  };

  return <li className={classes}>
    <div className="comment-wrapper">
      {name && <UserIcon userId={userId}>{name}</UserIcon>}
      <div className="comment-info">
        <div className="comment-name-time">
          {<span className="comment-name">{name}</span>}
          <span className="comment-time">{formatDateString(createdAt, 'HH:mm')}</span>
        </div>
        {editDisabled && <pre className="comment-text">{text}</pre>}
        {!editDisabled && <Textearea
          className="comment-texteria"
          placeholder=""
          textareaRef={commentTextarea}
          value={comment}
          onChange={onChangeComment} />
        }
      </div>
    </div>
    {userInfo?.id === userId && <div className="comment-management">
      <Button className="comment-like" onClick={onClickLike}><span></span></Button>
      {editDisabled && <Button className="comment-edit" onClick={onClickEdit}><span></span></Button>}
      {!editDisabled && <Button className="comment-submit-edit" onClick={onClickSubmitEdit}><span></span></Button>}
      <Button className="comment-delete" onClick={onClickDelete}><span></span></Button>
    </div>
    }
  </li>;
}