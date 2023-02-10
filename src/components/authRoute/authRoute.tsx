import { useAuth } from '../../hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = () => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to="/"/>;
  }
  return <Outlet/>;
};
