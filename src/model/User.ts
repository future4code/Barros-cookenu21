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
    role: string
 }
export interface InputControllerDTO{
    name: string,
    email: string,
    password: string
    role: UserRole
 }
export interface InputControllerLoginDTO{
    email: string,
    password: string
 }
export interface InputProfileDTO{
    id: string,
    name: string,
    email: string
 }
export interface InputProfileUserDTO{
    userId: string,
    author: string
 }
 