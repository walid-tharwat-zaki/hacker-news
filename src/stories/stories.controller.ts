import { Controller, Get, Query } from '@nestjs/common';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get('most-occurring')
  async getMostOccurring(
    @Query('count') count: number,
    @Query('words') wordsCount: number,
  ) {
    const mostOccurring = await this.storiesService.getMostOccurring(
      count ?? 25,
      wordsCount ?? 10,
    );
    return mostOccurring;
  }

  @Get('last-week')
  async getLastWeek(@Query('words') wordsCount: number) {
    const mostOccurring = await this.storiesService.getLastWeek(
      wordsCount ?? 10,
    );
    return mostOccurring;
  }

  @Get('user-karma')
  async getByUserKarma(
    @Query('count') count: number,
    @Query('minimum-karma') minimumKarma: number,
    @Query('words') wordsCount: number,
  ) {
    const mostOccurring = await this.storiesService.getByUserKarma(
      count ?? 100,
      minimumKarma ?? 10000,
      wordsCount ?? 10,
    );
    return mostOccurring;
  }
}
