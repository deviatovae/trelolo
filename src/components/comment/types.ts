import { Errors } from '../../API/types';
import { User } from '../../types/models';

export interface CommentProp {
  text: string,
  className?: string,
  user: User,
  commentId: string,
  createdAt: string,
  updatedAt: string | undefined,
  deleteComment: (id: string) => Promise<Errors | null>,
  editComment: (id: string, text: string) => void,
  addLike: (id: string) => Promise<Errors | undefined>,
  removeLike: (id: string) => Promise<Errors | undefined>,
  likes: number,
  isLiked: boolean,
}
