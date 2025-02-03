import { number } from "joi";

export type User = {
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
  email: string;
  password: string;
  role?:string;
};

