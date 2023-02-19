import { getResponse } from './response';
import { List, RequestMethod } from './types';
import { Comment, Like } from '../types/models';

export class CommentService {
  static getComments = (taskId: string) => getResponse<List<Comment>>({ url: `tasks/${taskId}/comments`, method: RequestMethod.GET });

  static createComment = (taskId: string, text: string) => getResponse<Comment>({
    url: `tasks/${taskId}/comments`,
    method: RequestMethod.POST,
    body: { text }
  });

  static updateComment = (id: string, text: string) => getResponse<Comment>({ url: `comments/${id}`, method: RequestMethod.PATCH, body: { text } });

  static deleteComment = (id: string) => getResponse<Comment>({ url: `comments/${id}`, method: RequestMethod.DELETE });
  
  static addLike = (commentId: string) => getResponse<Like>({ url: `comments/${commentId}/likes`, method: RequestMethod.POST });

  static removeLike = (commentId: string) => getResponse<Like>({ url: `comments/${commentId}/likes`, method: RequestMethod.DELETE });

}
