import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  createdAt: string; // ISO 문자열로 직렬화되어 옴
  updatedAt: string;
  author?: User; // nullable 관계이므로 옵셔널
}
