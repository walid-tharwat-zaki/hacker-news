import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Item } from './entities/item.entity';
import { ItemType } from './constants/item.enum';

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

  async getPostsByDate(fromDateUnixTime: number) {
    const maxId: number = (await axios.get(`${this.BASE_URL}/maxitem.json`))
      .data;
    let currentMax = maxId;
    let allFound = false;
    const NUMBER_OF_REQUESTS = 100;
    const temp = Array(NUMBER_OF_REQUESTS).fill('');
    const stories: Item[] = [];
    do {
      const items: Item[] = await Promise.all(
        temp.map(
          async (e, i) =>
            (
              await axios.get(`${this.BASE_URL}/item/${currentMax - i}.json`)
            ).data,
        ),
      );
      if (items[NUMBER_OF_REQUESTS - 1].time > fromDateUnixTime) {
        stories.push(...items.filter((item) => item.type == ItemType.STORY));
      } else {
        for (let item of items) {
          if (item.time < fromDateUnixTime) {
            allFound = true;
            break;
          }
          if (item.type == ItemType.STORY) {
            stories.push(item);
          }
        }
      }
      currentMax -= NUMBER_OF_REQUESTS;
    } while (!allFound);
    return stories;
  }

  async getLatestStoriesWithUsersMinimumKarma(
    count: number,
    userMinimumKarma: number,
  ) {
    const maxId: number = (await axios.get(`${this.BASE_URL}/maxitem.json`))
      .data;
    let currentMax = maxId;
    const foundUsers = {};
    const foundStories = [];
    const NUMBER_OF_REQUESTS = 100;
    const temp = Array(NUMBER_OF_REQUESTS).fill('');
    do {
      const items: Item[] = await Promise.all(
        temp.map(
          async (e, i) =>
            (
              await axios.get(`${this.BASE_URL}/item/${currentMax - i}.json`)
            ).data,
        ),
      );
      for (let item of items) {
        switch (item.type) {
          case ItemType.STORY:
            if (!foundUsers[item.by]) {
              foundUsers[item.by] = (
                await axios.get(`${this.BASE_URL}/user/${item.by}.json`)
              ).data;
            }
            if (foundUsers[item.by].karma >= userMinimumKarma) {
              foundStories.push(item);
            }
            break;
        }
      }
    } while (foundStories.length < count);
    return foundStories;
  }
}
