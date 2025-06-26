import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
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
}
