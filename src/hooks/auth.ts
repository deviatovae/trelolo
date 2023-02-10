import { useContext } from 'react';
import { AuthContext, InitialContext } from '../context/authContext';

export const useAuth = () => useContext(AuthContext) as InitialContext;
