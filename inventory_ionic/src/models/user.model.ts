export interface User {
  id?: string;
  name: string;
  role: Role;
  username: string;
  password: string;
}

export type Role = 'Admin' | 'Lab Assistant';
