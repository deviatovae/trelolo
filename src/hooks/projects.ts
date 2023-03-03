import { useContext } from 'react';
import { ProjectsContext } from '../context/projectsContext';

export const useProjects = () => useContext(ProjectsContext);
