import { Comments } from './comments';
import { User } from './user';

export interface Board {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  comments?:
    | Array<{
        id: number;
        content: string;
        author: User;
      }>[]
    | Comments[];
}
