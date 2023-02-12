import { Member, UserMembers } from '../types/models';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Errors, List, MemberData } from '../API/types';
import { useProjects } from '../hooks/projects';
import { MemberService } from '../API/memberService';
import { castToErrors } from '../utils/errors';

export interface MembersContextValue {
  members: List<Member>
  getGroupedMembers: () => UserMembers[],
  addMembers: (email: string, projectIds: string[]) => Promise<(Errors | null)[]>
  addMember: (projectId: string, member: MemberData) => Promise<Errors | null>
  deleteMember: (id: string) => Promise<Errors | null>
}

export const MembersContext = createContext<MembersContextValue>({
  members: {
    items: [],
    count: 0,
  },
  addMember: async () => null,
  addMembers: async () => [],
  getGroupedMembers: () => [],
  deleteMember: async () => null,
});

export const MembersProvider = ({ children }: { children: ReactNode }) => {
  const initialState: List<Member> = {
    items: [],
    count: 0
  };

  const [members, setMembers] = useState(initialState);
  const { projects } = useProjects();

  const getGroupedMembers = (): UserMembers[] => {
    const membersByUser = members.items.reduce((acc, member) => {
      const { user } = member;
      const { id: userId } = user;
      return acc.set(userId, { ...user, members: [...acc.get(userId)?.members || [], member] });
    }, new Map<string, UserMembers>());

    return Array.from(membersByUser.values());
  };

  const addMember = async (projectId: string, data: MemberData): Promise<Errors | null> => {
    try {
      const { data: member, errors } = await MemberService.addMember(projectId, data);
      if (errors) {
        return errors;
      }

      setMembers(({ items, count }) => ({
        items: [...items, member],
        count: count + 1
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const deleteMember = async (id: string): Promise<Errors | null> => {
    try {
      const { errors } = await MemberService.deleteMember(id);
      if (errors) {
        return errors;
      }

      setMembers(({ items, count }) => ({
        items: [...items.filter(({ id: memberId }) => id !== memberId)],
        count: Math.max(count - 1, 0)
      }));

      return null;
    } catch (e) {
      return castToErrors(e);
    }
  };

  const addMembers = async (email: string, projectIds: string[]): Promise<(Errors | null)[]> => {
    const promises = projectIds.reduce<Promise<Errors | null>[]>((acc, projectId) => {
      return [...acc, addMember(projectId, { email })];
    }, []);
    return Promise.all(promises);
  };

  useEffect(() => {
    projects.reduce(async (acc, { id }) => {
      const { data } = await MemberService.getMembers(id);
      const { items, count } = await acc;
      return {
        items: [...items, ...data.items],
        count: count + data.count
      };
    }, Promise.resolve<List<Member>>({
      items: [],
      count: 0
    })).then(result => setMembers(result));
  }, [projects]);

  return (
    <MembersContext.Provider value={{ members, addMember, addMembers, getGroupedMembers, deleteMember }}>{children}</MembersContext.Provider>
  );
};
