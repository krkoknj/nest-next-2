import { Board, User } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
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

  createBoard(request): Promise<Board> {
    const board = this.boardRepository.create({
      title: request.title,
      content: request.content,
      author: { id: request.userId } as User, // Partial relation
    });
    return this.boardRepository.save(board);
  }

  async findBoardById(boardId: number): Promise<Board | null> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['author', 'comments', 'comments.author'],
    });
  }
}
