import { getResponse } from './response';
import { List, MemberData, RequestMethod } from './types';
import { Member } from '../types/models';

export class MemberService {
  static getMembers = (projectId: string) => getResponse<List<Member>>({ url: `projects/${projectId}/members`, method: RequestMethod.GET });

  static addMember = (projectId: string, data: MemberData) => getResponse<Member>({ url: `projects/${projectId}/members`, method: RequestMethod.POST, body: data });

  static deleteMember = (id: string) => getResponse<Member>({ url: `members/${id}`, method: RequestMethod.DELETE });
}
