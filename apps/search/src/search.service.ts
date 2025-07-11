import { Board } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private readonly indexName: string;
  constructor(
    private readonly es: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    this.indexName = this.configService.get('ELASTICSEARCH_INDEX') || 'boards';
  }

  getHello(): string {
    return 'Hello World!';
  }

  async indexBoard(
    board: Pick<Board, 'id' | 'title' | 'content' | 'author' | 'createdAt'>,
  ) {
    console.log('indexBoard data', board);

    const createdAtIso =
      typeof board.createdAt === 'string'
        ? board.createdAt
        : board.createdAt.toISOString();
    await this.es.index<{
      title: string;
      content: string;
      author: number;
      createdAt: string;
    }>({
      index: this.indexName,
      id: board.id.toString(),
      document: {
        title: board.title,
        content: board.content,
        author: board.author.id ?? board.author.email,
        createdAt: createdAtIso,
      },
    });
    this.logger.log(`Indexed board->>>>>>>>>>>>>>>>>>>>>>>>>> ${board.id}`);
  }

  // 콘텐츠에서 검색어 주변을 잘라주는 간단 함수
  private createSnippet(content: string, term: string) {
    const idx = content.indexOf(term);
    if (idx === -1) return content.slice(0, 100) + '…';
    return '…' + content.slice(Math.max(0, idx - 20), idx + 80) + '…';
  }

  async musizBrainzRecordingSearch(query: string): Promise<any> {
    let recording = this.configService.get('MUSICBRAINZ_API_RECORDING_URL');
    recording += `?query=${encodeURIComponent(query)}&fmt=json`;
    const response = await fetch(recording);
    return response.json();
  }
}
