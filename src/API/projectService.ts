import { getResponse } from './response';
import { Project, RequestsMethods } from './types';

export const createProject = (project: Project) => getResponse({ url: 'projects', method: RequestsMethods.POST, body: project });

export const updateProject = (project: Project, id: number) => getResponse({ url: `projects/:${id}`, method: RequestsMethods.PATCH, body: project });

export const deleteProject = (id: number) => getResponse({ url: `projects/${id}`, method: RequestsMethods.DELETE });
