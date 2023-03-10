import { Errors, List, ProjectData } from '../API/types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  createProject as apiCreateProject,
  deleteProject as apiDeleteProject,
  getProjects as apiGetProjects,
  updateProject as apiUpdateProject
} from '../API/projectService';
import { Project } from '../types/models';
import { castToErrors } from '../utils/errors';
import { useAuth } from '../hooks/auth';

export interface ProjectsContextValue {
  projects: Project[]
  count: number
  getMyProjects: () => Project[]
  getTeamProjects: () => Project[]
  getProject: (id: string) => Project | null
  addProject: (project: ProjectData) => Promise<Errors | null>
  updateProject: (id: string, project: ProjectData) => Promise<Errors | null>
  deleteProject: (id: string) => Promise<Errors | null>
  isFetchingProject: boolean
}

export const ProjectsContext = createContext<ProjectsContextValue>({
  projects: [],
  count: 0,
  getMyProjects: () => [],
  getTeamProjects: () => [],
  getProject: () => null,
  addProject: async () => null,
  updateProject: async () => null,
  deleteProject: async () => null,
  isFetchingProject: false,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<List<Project>>({
    items: [],
    count: 0,
  });

  const [isFetchingProject, setIsFetchingProject] = useState<boolean>(true);

  const { userInfo } = useAuth();
  const getMyProjects = () => result.items.filter(project => project.ownerId === userInfo?.id);
  const getTeamProjects = () => result.items.filter(project => project.ownerId !== userInfo?.id);

  const getProject = (id: string): Project | null => {
    return result.items.find(project => project.id === id) || null;
  };

  const addProject = async (data: ProjectData): Promise<Errors | null> => {
    try {
      const { data: project, errors } = await apiCreateProject(data);
      if (errors) {
        return errors;
      }

      setResult(({ items, count }) => ({
        items: [...items, project],
        count: count + 1
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const updateProject = async (id: string, data: ProjectData): Promise<Errors | null> => {
    try {
      const { data: project } = await apiUpdateProject(id, data);
      setResult(({ items, count }) => {
        const idx = items.findIndex((item) => item.id === id);
        items[idx] = project;
        return {
          items: [...items],
          count: count
        };
      });

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteProject = async (id: string): Promise<Errors | null> => {
    try {
      await apiDeleteProject(id);
      setResult(({ items, count }) => {

        return {
          items: items.filter(item => item.id !== id),
          count: count - 1,
        };
      });
      return null;


    } catch (e) {
      return castToErrors(e);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await apiGetProjects();
      setResult(data);
      setIsFetchingProject(false);
    };
    fetchProjects();
  }, []);

  const { items: projects, count } = result;

  return (
    <ProjectsContext.Provider value={{
      projects,
      count,
      getMyProjects,
      getTeamProjects,
      getProject,
      addProject,
      updateProject,
      deleteProject,
      isFetchingProject
    }}>{children}</ProjectsContext.Provider>
  );
};
