import { Errors, List } from '../API/types';
import { Comment } from '../types/models';

import { createContext, ReactNode, useCallback, useState } from 'react';
import { castToErrors } from '../utils/errors';
import { CommentService } from '../API/commentService';

export interface CommentContextValue {
  getComment: (id: string) => Comment | null
  createComment: (taskId: string, text: string) => Promise<(Errors | null)>
  editComment: (id: string, text: string) => Promise<(Errors | null)>
  deleteComment: (id: string) => Promise<(Errors | null)>
  comments: List<Comment>
  updateComments: (taskId: string) => Promise<void>
}
const initialState: List<Comment>  = {
  items: [],
  count: 0,
};

export const CommentsContext = createContext<CommentContextValue>({
  createComment: async () => null,
  editComment: async () => null,
  deleteComment: async () => null,
  getComment: () => null,
  comments:  initialState,
  updateComments: async (taskId: string) => undefined,
});

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState(initialState);

  const updateComments = useCallback(async (taskId: string) => {
    const { data, errors } = await CommentService.getComments(taskId);

    if (!errors && data ) {
      setComments(data);
    }
  }, []);

  const getComment = (id: string): Comment => {
    const comment = Object.values(comments).find(item => item.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return comment;
  };

  const createComment = async (taskId: string, text: string) => {
    try {
      const { data: commentItem, errors } = await CommentService.createComment(taskId, text);
      if (errors) {
        return errors;
      }

      setComments(({ items, count }) => ({
        items: [...items, commentItem],
        count: count + 1,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const { data: commentItem, errors } = await CommentService.deleteComment(id);
      if (errors) {
        return errors;
      }
      setComments(({ items, count }) => ({
        items: items.filter((item) => item.id !== commentItem.id),
        count: count - 1, 
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const editComment = async (id: string, text: string) => {
    try {
      const { data: commentItem, errors } = await CommentService.updateComment(id, text);
      if (errors) {
        return errors;
      }

      setComments(({ items, count }) => ({
        items: items.map((item) => item.id === commentItem.id ? commentItem : item),
        count,
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  return (
    <CommentsContext.Provider value={{ createComment, editComment, deleteComment, getComment, updateComments, comments  }}>{children}</CommentsContext.Provider>
  );
};