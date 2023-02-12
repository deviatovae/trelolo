import { useContext } from 'react';
import { MembersContext } from '../context/membersContext';

export const useMembers = () => useContext(MembersContext);
