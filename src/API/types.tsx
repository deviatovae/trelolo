import { User } from '../types/models';

export interface Request {
    url: string,
    method?: string,
    body?: object
}

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export type Errors = string[] | ValidationError[];

export interface Response<T> {
    result: boolean
    data: T
    errors: Errors | null
}

export interface List<T> {
    items: T[]
    count: number
}

export interface ValidationError {
    param: string
    msg: string
}

export interface LoginData {
    email: string,
    name?: string,
    password: string
}

export interface ProjectData {
    name: string
}

export interface MemberData {
    email: string
}

export interface LoginResponse {
    user: User,
    token: string,
}

export interface SectionCreateData {
    name: string
}

export interface SectionUpdateData {
    name?: string
}

export interface TaskCreateData {
    name: string
}

export interface TaskUpdateData {
    name?: string
    position?: number
    assignees?: string[]
    description?: string
    dueDate?: string | null
    isCompleted?: boolean
}


export interface UpdateUserData {
    name?: string
    email?: string
    currentPassword?: string
    password?: string
    colorHue?: number
}
