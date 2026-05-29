export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface StoredUser extends User {
  passwordHash: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
