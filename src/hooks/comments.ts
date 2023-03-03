import { useContext } from 'react';
import { CommentsContext, CommentContextValue } from '../context/commentsContext';

export const useComments = () => useContext(CommentsContext) as CommentContextValue;
