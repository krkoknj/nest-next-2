import { User } from './user';

export interface Comments {
  id: number;
  content: string;
  author: User;
  createdAt: string;
}
