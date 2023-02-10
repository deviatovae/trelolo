import { getResponse } from './response';
import { RequestMethod } from './types';
import { Project } from '../types/models';

export const createProject = (project: Project) => getResponse({ url: 'projects', method: RequestMethod.POST, body: project });

export const updateProject = (project: Project, id: number) => getResponse({ url: `projects/:${id}`, method: RequestMethod.PATCH, body: project });

export const deleteProject = (id: number) => getResponse({ url: `projects/${id}`, method: RequestMethod.DELETE });
