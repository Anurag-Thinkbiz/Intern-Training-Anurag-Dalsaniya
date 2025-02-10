export type CreateUser = {
  id?:string;
  name: string;
  role: string;
  password: string;
  email: string;
  address: string;

};
export type UserRole ={
  admin : "admin",
  user : "user"
}
export type UpdateUser = {
  name?: string;
  role?: string;
  password?: string;
  email?: string;
  address?: string;
};
export type LoginUser = {
  id?:string;
  email: string;
  password: string;
  role?:string;
};
