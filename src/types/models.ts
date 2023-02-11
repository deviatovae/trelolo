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
  name: string,
  position: number
}

export interface Member {
  id: string
  project: Project
  user: User
}
