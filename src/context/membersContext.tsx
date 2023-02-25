import { Member, UserWithMembers } from '../types/models';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Errors, List, MemberData } from '../API/types';
import { useProjects } from '../hooks/projects';
import { MemberService } from '../API/memberService';
import { castToErrors } from '../utils/errors';
import { useAuth } from '../hooks/auth';

export interface MembersContextValue {
  members: List<Member>
  getUserWithMembers: () => UserWithMembers[],
  addMembers: (email: string, projectIds: string[]) => Promise<(Errors | null)[]>
  addMember: (projectId: string, member: MemberData) => Promise<Errors | null>
  deleteMember: (id: string) => Promise<Errors | null>
  isFetchingMembers: boolean
}

export const MembersContext = createContext<MembersContextValue>({
  members: {
    items: [],
    count: 0,
  },
  addMember: async () => null,
  addMembers: async () => [],
  getUserWithMembers: () => [],
  deleteMember: async () => null,
  isFetchingMembers: false
});

export const MembersProvider = ({ children, projectId: selectedProjectId }: { children: ReactNode, projectId?: string }) => {
  const initialState: List<Member> = {
    items: [],
    count: 0
  };

  const { userInfo } = useAuth();
  const [members, setMembers] = useState(initialState);
  const { projects } = useProjects();
  const [isFetchingMembers, setIsFetchingMembers] = useState<boolean>(true);

  const getGroupedMembers = (): UserWithMembers[] => {
    const membersByUser = members.items.reduce((acc, member) => {
      const { user } = member;
      const { id: userId } = user;
      return acc.set(userId, { ...user, members: [...acc.get(userId)?.members || [], member] });
    }, new Map<string, UserWithMembers>());

    return Array.from(membersByUser.values()).sort((a) => a.id === userInfo?.id ? -1 : 1);
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
    const selectedProject = selectedProjectId ? projects.find(({ id }) => id === selectedProjectId) : null;
    const usedProjects = selectedProject ? [selectedProject] : projects;


    usedProjects.reduce(async (acc, { id }) => {
      const { data } = await MemberService.getMembers(id);
      const { items, count } = await acc;
      setIsFetchingMembers(false);
      return {
        items: [...items, ...data.items],
        count: count + data.count
      };

    }, Promise.resolve<List<Member>>({
      items: [],
      count: 0
    })).then(result => setMembers(result));
  }, [projects, selectedProjectId]);

  return (
    <MembersContext.Provider value={{ members, addMember, addMembers, getUserWithMembers: getGroupedMembers, deleteMember, isFetchingMembers }}>
      {children}
    </MembersContext.Provider>
  );
};
