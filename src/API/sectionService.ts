import { getResponse } from './response';
import { List, RequestMethod, SectionCreateData } from './types';
import { Section } from '../types/models';

export class SectionService {
  static getSections = (projectId: string) => getResponse<List<Section>>({ url: `projects/${projectId}/sections`, method: RequestMethod.GET });

  static createSection = (projectId: string, data: SectionCreateData) => getResponse<Section>({
    url: `projects/${projectId}/sections`,
    method: RequestMethod.POST,
    body: data
  });

  static updateSection = (id: string, section: Section) => getResponse({ url: `sections/:${id}`, method: RequestMethod.PATCH, body: section });

  static deleteSection = (id: string) => getResponse({ url: `sections/:${id}`, method: RequestMethod.DELETE });

}
