import { getResponse } from './response';
import { RequestsMethods, Section } from './types';

export const createSection = (section: Section, projectId: number) => getResponse({ url: `projects/${projectId}/sections`, method: RequestsMethods.POST, body: section });

export const updateSection = (section: Section, id: number) => getResponse({ url: `sections/:${id}`, method: RequestsMethods.PATCH, body: section });

export const deleteSection = (id: number) => getResponse({ url: `sections/:${id}`, method: RequestsMethods.DELETE });

export const getSections = (projectId: number) => getResponse({ url: `projects/${projectId}/sections`, method: RequestsMethods.GET });
