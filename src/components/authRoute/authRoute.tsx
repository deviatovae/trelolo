import { useAuth } from '../../hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import Aside from '../aside/aside';
import { ProjectsProvider } from '../../context/projectsContext';

export const AuthRoute = () => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <ProjectsProvider>
      <div className="project-page__container">
        <Aside></Aside>
        <Outlet />
      </div>
    </ProjectsProvider>
  );
};
