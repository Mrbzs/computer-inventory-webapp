// Note: All ids generated automatically by mongodb

export interface User {
  _id?: any;
  name: string;
  role: Role;
  email?: string;
  username: string;
  password: string;
}

export type Role = 'Admin' | 'Lab Assistant';
