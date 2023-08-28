import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { StoriesAPIService } from './stories-api.service';
import { STORIES } from './testing/stories.test';

describe('StoriesService', () => {
  let service: StoriesService;
  let apiService: StoriesAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoriesService, StoriesAPIService],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    apiService = module.get<StoriesAPIService>(StoriesAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 0 words if no stories', async () => {
    jest
      .spyOn(apiService, 'getLatestStories')
      .mockImplementation(async () => []);
    expect(await service.getMostOccurring(25, 10)).toStrictEqual([]);
  });

  it('should return 10 most occurring words', async () => {
    jest
      .spyOn(apiService, 'getLatestStories')
      .mockImplementation(async () => STORIES.splice(0, 25));
    expect(await service.getMostOccurring(25, 10)).toStrictEqual([
      'keyword0',
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4',
      'keyword5',
      'keyword6',
      'keyword7',
      'keyword8',
      'keyword9',
    ]);
  });

  it('should return same requested number of recent stories', async () => {
    const count = 25;
    expect((await apiService.getLatestStories(count)).length).toBe(count);
  });

  it('should return all stories till specific time', async () => {
    const interval = 600; //10 min
    const time = new Date().getTime() / 1000 - interval;
    const stories = await apiService.getPostsByDate(time);
    for (let story of stories) {
      expect(story.time).toBeGreaterThanOrEqual(time);
    }
    const oneStoryBefore = await apiService.getPrevStory(
      stories[stories.length - 1].id,
    );
    expect(oneStoryBefore.time).toBeLessThan(time);
  });
});
