import { Board, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentRequest } from '../dto/create-comment.request';
import { Comment } from '@app/common/database/entities/comment.entity';
import { SEARCH_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(SEARCH_SERVICE) private searchClient: ClientProxy,
  ) {}
  async findBoardsWithCount(
    page: number,
    size: number,
  ): Promise<{ data: Board[]; total: number }> {
    const [data, total] = await this.boardRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async createBoard(request): Promise<Board> {
    const board = this.boardRepository.create({
      title: request.title,
      content: request.content,
      author: { id: request.userId } as User, // Partial relation
    });
    const savedBoard = await this.boardRepository.save(board);
    // await lastValueFrom(
    // this.searchClient.emit('board_created', { board: savedBoard }),
    // );
    return savedBoard;
  }

  async findBoardById(boardId: number): Promise<Board | null> {
    const board = this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['author', 'comments', 'comments.author'],
      order: { comments: { createdAt: 'DESC' } }, // Order comments by creation date
    });
    return board;
  }

  async createComment(
    boardId: number,
    request: CreateCommentRequest,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: request.content,
      author: { id: request.userId } as User,
      board: { id: boardId } as Board,
    });
    return this.commentRepository.save(comment);
  }
}
