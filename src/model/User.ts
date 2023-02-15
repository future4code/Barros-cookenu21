export type AuthenticationData = {
  id: string;
  role: string;
};
export type Authentication = {
  id: string;
};

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface UserFindAllBusiness {
  id: string;
  name: string;
  email: string;
  role: string;
}
export interface InputControllerDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export interface InputControllerLoginDTO {
  email: string;
  password: string;
}
export interface InputProfileDTO {
  id: string;
  name: string;
  email: string;
}
export interface InputUpdateDTO {
  id: string;
  name: string;
  email: string;
  password:string;
}
export interface InputRecoverPassDTO {
    password: string;
}
export interface InputRecoverEmailDTO {
    email: string;
}
export interface InputProfileUserDTO {
  userId: string;
  author: string;
}
