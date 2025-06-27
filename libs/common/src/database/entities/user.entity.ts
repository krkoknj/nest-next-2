import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from '@app/common';
import { Comment } from './comment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Board, (board) => board.author)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.author, { nullable: true })
  comments?: Comment[];
}
