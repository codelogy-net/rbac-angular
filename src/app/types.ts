export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  STAFF = 'STAFF',
  USER = 'USER'
}

export interface Role {
  id: number;
  name: string;
  uid: string; // ADMINISTRATOR, STAFF, USER
  extends?: number | null; // id of another role
}

export interface User {
  id: number;
  name: string;
  role: Role;
}
