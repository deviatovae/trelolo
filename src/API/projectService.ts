import { getResponse } from './response';
import { Project, ProjectData, RequestsMethods, ResponseList } from './types';

export const getProjects = () => getResponse<ResponseList<Project>>({ url: 'projects', method: RequestsMethods.GET });

export const createProject = (project: ProjectData) => getResponse({ url: 'projects', method: RequestsMethods.POST, body: project });

export const updateProject = (project: ProjectData, id: number) => getResponse({ url: `projects/:${id}`, method: RequestsMethods.PATCH, body: project });

export const deleteProject = (id: number) => getResponse({ url: `projects/${id}`, method: RequestsMethods.DELETE });
