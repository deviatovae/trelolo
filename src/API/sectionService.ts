import { getResponse } from './response';
import { List, RequestMethod, SectionCreateData, SectionUpdateData } from './types';
import { Section } from '../types/models';

export class SectionService {
  static getSections = (projectId: string) => getResponse<List<Section>>({ url: `projects/${projectId}/sections`, method: RequestMethod.GET });

  static createSection = (projectId: string, data: SectionCreateData) => getResponse<Section>({
    url: `projects/${projectId}/sections`,
    method: RequestMethod.POST,
    body: data
  });

  static updateSection = (id: string, data: SectionUpdateData) => getResponse<Section>({ url: `sections/${id}`, method: RequestMethod.PATCH, body: data });
  
  static moveSection = (sectionId: string, position: number) => getResponse<Section>({
    url: `sections/${sectionId}/move`,
    method: RequestMethod.PATCH,
    body: { position }
  });

  static deleteSection = (id: string) => getResponse<void>({ url: `sections/${id}`, method: RequestMethod.DELETE });

}
