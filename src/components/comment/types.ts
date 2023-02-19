import { Errors } from '../../API/types';

export interface CommentProp {
  text: string,
  className?: string,
  userId: string,
  commentId: string,
  name: string,
  createdAt: string,
  deleteComment: (id: string) => Promise<Errors | null>,
  editComment: (id: string, text: string) => void,
  addLike: (id: string) => Promise<Errors | undefined>,
  removeLike: (id: string) => Promise<Errors | undefined>,
  likes: number,
  isLiked: boolean,
}