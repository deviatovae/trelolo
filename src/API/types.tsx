export interface LoginData {
    email: string,
    name?: string,
    password: string
}

export interface Project {
    id: string,
    name: string
}

export interface ProjectData {
    name: string
}

export interface Section {
    name?: string,
    position?: number
}

export interface Response {
    url: string,
    method?: string,
    body?: object
}

export enum RequestsMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export interface UserInfo {
    id: string,
    name: string,
    email: string,
}

export interface ResponseDataLogin {
    data: {
        user: UserInfo,
        token: string,

    }
}

export interface ServerResponse<T> {
    result: boolean
    data?: T
    errors: string[] | object[]
}

export interface ResponseList<T> {
    items: T[]
    count: number
}
