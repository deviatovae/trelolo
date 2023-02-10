import { Errors, List, ProjectData } from '../API/types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { createProject, getProjects } from '../API/projectService';
import { Project } from '../types/models';

export interface ProjectsContextValue {
  projects: Project[]
  count: number

  addProject: (project: ProjectData) => Promise<Errors | null>
}

export const ProjectsContext = createContext<ProjectsContextValue>({
  projects: [],
  count: 0,
  addProject: async () => null,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<List<Project>>({
    items: [],
    count: 0,
  });

  const addProject = async (data: ProjectData): Promise<Errors | null> => {
    const { data: project, errors } = await createProject(data);
    if (errors) {
      return errors;
    }

    setResult(({ items, count }) => ({
      items: [...items, project],
      count: count + 1
    }));

    return null;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getProjects();
      setResult(data);
    };

    fetchProjects();
  }, []);

  const { items: projects, count } = result;

  return (
    <ProjectsContext.Provider value={{ projects, count, addProject }}>{children}</ProjectsContext.Provider>
  );
};
