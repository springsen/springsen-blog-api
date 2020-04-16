import { Request } from 'express';

export interface User {
  username: string;
}

export interface UserRequest extends Request {
  user: User;
}
