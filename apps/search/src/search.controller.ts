import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.searchService.getHello();
  }

  @EventPattern('board_created')
  async handleBoardCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('handleBoardCreated data', data);
    this.searchService.indexBoard(data.board);
    // this.rmqService.ack(context);
  }

  @Get('musizBrainz/search')
  async musizBrainzSearch(
    @Query('query') query: string,
    @Query('type') type: string,
  ): Promise<any> {
    if (type === 'recording') {
      return this.searchService.musizBrainzRecordingSearch(query);
    }
    // Handle other types if needed
  }
}
