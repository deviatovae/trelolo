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

export interface ProjectsContextValue {
  projects: Project[]
  count: number
  getProject: (id: string) => Project | null
  addProject: (project: ProjectData) => Promise<Errors | null>
  updateProject: (id: string, project: ProjectData) => Promise<Errors | null>
  deleteProject: (id: string) => Promise<Errors | null>
}

export const ProjectsContext = createContext<ProjectsContextValue>({
  projects: [],
  count: 0,
  getProject: () => null,
  addProject: async () => null,
  updateProject: async () => null,
  deleteProject: async () => null,
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<List<Project>>({
    items: [],
    count: 0,
  });

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
    };

    fetchProjects();
  }, []);

  const { items: projects, count } = result;

  return (
    <ProjectsContext.Provider value={{ projects, count, getProject, addProject, updateProject, deleteProject }}>{children}</ProjectsContext.Provider>
  );
};
