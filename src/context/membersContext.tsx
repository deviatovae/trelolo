import { Member } from '../types/models';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { List } from '../API/types';
import { useProjects } from '../hooks/projects';
import { MemberService } from '../API/memberService';

export interface MembersContextValue {
  members: List<Member>
  // getMember: (id: string) => Member | null
  // addMember: (member: MemberData) => Promise<Errors | null>
  // updateMember: (id: string, member: MemberData) => Promise<Errors | null>
  // deleteMember: (id: string) => Promise<Errors | null>
}

export const MembersContext = createContext<MembersContextValue>({
  members: {
    items: [],
    count: 0,
  },
});

export const MembersProvider = ({ children }: { children: ReactNode }) => {
  const initialState: List<Member> = {
    items: [],
    count: 0
  };

  const [members, setMembers] = useState(initialState);
  const { projects } = useProjects();

  useEffect(() => {
    projects.reduce(async (acc, { id }) => {
      const { data } = await MemberService.getMembers(id);
      const { items, count } = await acc;
      return {
        items: [...items, ...data.items],
        count: count + data.count
      };
    }, Promise.resolve(initialState)).then(result => setMembers(result));
  }, [projects]);

  return (
    <MembersContext.Provider value={{ members }}>{children}</MembersContext.Provider>
  );
};
