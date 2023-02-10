export type AuthenticationData = {
    id: string
 }

export enum UserRole{
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL',
}
 
export interface UserDTO{
    id: string,
    name: string,
    email: string,
    password: string
    role: UserRole
 }
export interface InputControllerDTO{
    name: string,
    email: string,
    password: string
    role: UserRole
 }
 