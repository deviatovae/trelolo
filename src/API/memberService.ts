import { getResponse } from './response';
import { List, RequestMethod } from './types';
import { Member } from '../types/models';

export class MemberService {
  static getMembers = (projectId: string) => getResponse<List<Member>>( { url: `projects/${projectId}/members`, method: RequestMethod.GET });
}
