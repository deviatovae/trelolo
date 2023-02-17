import { Assignee } from './types';

export interface User {
  id: string,
  name: string,
  email: string,
}

export interface Project {
  id: string
  name: string
}

export interface Section {
  id: string
  projectId: string
  name: string,
  position: number
}

export interface Member {
  id: string
  project: Project
  user: User
}

export interface UserMembers {
  id: string,
  name: string,
  email: string,
  members: Member[]
}

export interface Task {
  id: string
  assignees: Assignee[] | []
  sectionId: string
  name: string
  position: number
  description: string
  dueDate: string | null
  isCompleted: boolean
}

export type MyTask = Task & { section: Section & { project: { name: string } } };
