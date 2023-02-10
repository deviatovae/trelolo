import { getResponse } from './response';
import { List, ProjectData, RequestMethod } from './types';
import { Project } from '../types/models';

export const getProjects = () => getResponse<List<Project>>({ url: 'projects', method: RequestMethod.GET });

export const createProject = (project: ProjectData) => getResponse<Project>({ url: 'projects', method: RequestMethod.POST, body: project });

export const updateProject = (project: ProjectData, id: number) => getResponse<Project>({ url: `projects/:${id}`, method: RequestMethod.PATCH, body: project });

export const deleteProject = (id: number) => getResponse<void>({ url: `projects/${id}`, method: RequestMethod.DELETE });
