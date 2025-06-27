// apps/board/src/comment.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';
import { User } from '@app/common';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /** 어떤 게시글의 댓글인지 */
  @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
  board: Board;

  /** 누가 작성했는지 (선택) */
  @ManyToOne(() => User, (user) => user.comments, { nullable: true })
  author?: User;
}
