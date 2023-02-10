import { getResponse } from './response';
import { RequestMethod } from './types';
import { Section } from '../types/models';

export const createSection = (section: Section, projectId: number) => getResponse({ url: `projects/${projectId}/sections`, method: RequestMethod.POST, body: section });

export const updateSection = (section: Section, id: number) => getResponse({ url: `sections/:${id}`, method: RequestMethod.PATCH, body: section });

export const deleteSection = (id: number) => getResponse({ url: `sections/:${id}`, method: RequestMethod.DELETE });

export const getSections = (projectId: number) => getResponse({ url: `projects/${projectId}/sections`, method: RequestMethod.GET });
