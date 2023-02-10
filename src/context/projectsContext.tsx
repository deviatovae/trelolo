import { List } from '../API/types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { getProjects } from '../API/projectService';
import { Project } from '../types/models';

export interface ProjectsContextValue {
  projects: Project[]
  count: number
}

export const ProjectsContext = createContext<ProjectsContextValue>({
  projects: [],
  count: 0
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<List<Project>>({
    items: [],
    count: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getProjects();
      setResult(data);
    };

    fetchProjects();
  }, []);

  const { items: projects, count } = result;

  return (
    <ProjectsContext.Provider value={{ projects, count }}>{children}</ProjectsContext.Provider>
  );
};
