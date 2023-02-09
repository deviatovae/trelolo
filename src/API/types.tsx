export interface LoginData {
    email: string,
    name?: string,
    password: string
}

export interface Project {
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