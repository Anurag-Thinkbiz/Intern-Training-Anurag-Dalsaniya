import { number } from "joi";

export type User = {
  id?:number;
  name: string;
  role: string;
  password: string;
  email: string;
  address: string;
};
export type UpdateUser = {
  name?: string;
  role?: string;
  password?: string;
  email?: string;
  address?: string;
};
export type LoginUser = {
  id?:number;
  email: string;
  password: string;
  role?:string;
};
