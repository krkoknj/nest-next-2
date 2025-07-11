import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardRequest } from '../dto/create-board.request';
import { Board, JwtAuthGuard } from '@app/common';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateCommentRequest } from '../dto/create-comment.request';
import { Comment } from '@app/common/database/entities/comment.entity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findBoardsWithCount(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ): Promise<{ data: Board[]; total: number }> {
    return this.boardService.findBoardsWithCount(page, size);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBoard(
    @Req() req: Request & { user: { id: number } },
    @Body() request: CreateBoardRequest,
  ) {
    const data = await this.boardService.createBoard({
      ...request,
      userId: req.user.id,
    });
    return data;
  }

  @Get(':boardId')
  async findBoardById(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<Board | null> {
    return this.boardService.findBoardById(boardId);
  }

  @Post(':boardId/comments')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() request: CreateCommentRequest,
    @Req() req: Request & { user: { id: number } },
  ): Promise<Comment> {
    return this.boardService.createComment(boardId, {
      ...request,
      userId: req.user.id,
    });
  }
}
