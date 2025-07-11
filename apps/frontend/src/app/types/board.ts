import { User } from './user';

export interface Board {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO 문자열
  updatedAt: string;
  author: User; // 게시글 작성자
  comments: Comment[]; // 댓글 배열 (빈 배열일 수도 있음)
}
