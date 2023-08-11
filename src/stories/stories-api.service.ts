import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StoriesAPIService {
  BASE_URL = 'https://hacker-news.firebaseio.com/v0';

  async getLatestStories(count: number) {
    const allStoriesIds: number[] = (
      await axios.get(`${this.BASE_URL}/newstories.json`)
    ).data;
    const storiesIds = allStoriesIds.slice(0, count);
    const stories = await Promise.all(
      storiesIds.map(
        async (storyId) =>
          (
            await axios.get(`${this.BASE_URL}/item/${storyId}.json`)
          ).data,
      ),
    );
    return stories;
  }
}
