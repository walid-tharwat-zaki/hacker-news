import { Injectable } from '@nestjs/common';
import { StoriesAPIService } from './stories-api.service';
import { StoriesStatisticsUtils } from './utils/stories-statistics.utils';

@Injectable()
export class StoriesService {
  constructor(private readonly storiesAPIService: StoriesAPIService) {}

  async getMostOccurring(count: number, wordsCount: number) {
    const stories = await this.storiesAPIService.getLatestStories(count);
    return StoriesStatisticsUtils.getMostOccurringWordsInTitles(
      stories,
      wordsCount,
    );
  }

  async getLastWeek(wordsCount: number) {
    const date = new Date().getTime() / 1000;
    const weekAgo = date - 0.1 * 24 * 3600;
    const stories = await this.storiesAPIService.getPostsByDate(weekAgo);
    return StoriesStatisticsUtils.getMostOccurringWordsInTitles(
      stories,
      wordsCount,
    );
  }

  async getByUserKarma(
    count: number,
    minimumKarma: number,
    wordsCount: number,
  ) {
    const stories =
      await this.storiesAPIService.getLatestStoriesWithUsersMinimumKarma(
        count,
        minimumKarma,
      );
    return StoriesStatisticsUtils.getMostOccurringWordsInTitles(
      stories,
      wordsCount,
    );
  }
}
