import { Assignee } from './types';

export interface User {
  id: string,
  name: string,
  email: string,
}

export interface Project {
  id: string
  name: string
  ownerId: string
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

export interface UserWithMembers {
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

export interface Comment {
  id: string,
  taskId: string,
  text: string,
  user: User,
  likes: number,
  isLiked: boolean,
  createdAt: string
  updatedAt: string
}

export interface Like {
  id: string,
  likes: number,
  isLiked: boolean,
}

export type MyTask = Task & { section: Section & { project: { name: string } } };
