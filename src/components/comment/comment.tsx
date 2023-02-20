import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { formatDateString } from '../../utils/formatDate';
import Button from '../button/button';
import { Textearea } from '../textarea/textearea';
import { UserIcon } from '../userIcon/userIcon';
import { useTranslate } from '../../hooks/useTranslate';
import './comment.scss';
import './types';
import { CommentProp } from './types';
import { Message } from '../languages/messages';

export default function Comment({ className, text, userId, commentId, name, createdAt, updatedAt,
  deleteComment, editComment, addLike, removeLike, likes, isLiked }: CommentProp) {

  const { trans } = useTranslate();
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
    addLike(commentId);
  };

  const onClickUnLike = () => {
    removeLike(commentId);
  };

  const onClickSubmitEdit = () => {
    editComment(commentId, comment);
    setEditDisabled(true);
  };

  const createdDay = formatDateString(createdAt, 'yyyy-MM-dd') === formatDateString(new Date().toString(), 'yyyy-MM-dd')
    ? `${trans(Message.Today)}, ${formatDateString(createdAt, 'HH:mm')}`
    : formatDateString(createdAt, 'dd MMMM, HH:mm');

  return <li className={classes}>
    <div className="comment-wrapper">
      {name && <UserIcon userId={userId}>{name}</UserIcon>}
      <div className="comment-info">
        <div className="comment-name-time">
          <span className="comment-name">{name}</span>
          <span className="comment-time">{createdDay}</span>
          {updatedAt && <span className="comment-time">{trans(Message.Edited)}</span>}
        </div>
        {editDisabled && <p className="comment-text">{text}</p>}
        {!editDisabled && <Textearea
          className="comment-texteria"
          placeholder=""
          textareaRef={commentTextarea}
          value={comment}
          onChange={onChangeComment} />
        }
      </div>
    </div>
    <div className="comment-management">
      <div className="comment-likes">
        {!isLiked && <Button className="comment-like" onClick={onClickLike}><span></span></Button>}
        {isLiked && <Button className="comment-unlike" onClick={onClickUnLike}><span>{likes}</span></Button>}
        <span className="comment-likes-count">{likes}</span>
      </div>
      {userInfo?.id === userId && <>
        {editDisabled && <Button className="comment-edit" onClick={onClickEdit}><span></span></Button>}
        {!editDisabled && <Button className="comment-submit-edit" onClick={onClickSubmitEdit}><span></span></Button>}
        <Button className="comment-delete" onClick={onClickDelete}><span></span></Button>
      </>}
    </div>
  </li>;
}