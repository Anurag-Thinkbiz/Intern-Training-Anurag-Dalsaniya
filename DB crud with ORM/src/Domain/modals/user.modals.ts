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
  id:string;
  name?: string;
  role?: string;
  password?: string;
  email?: string;
  address?: string;
};
export type LoginUser = {
  email: string;
  password: string;
};
