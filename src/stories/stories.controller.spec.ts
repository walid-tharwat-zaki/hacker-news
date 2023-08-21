import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { StoriesStatisticsUtils } from './utils/stories-statistics.utils';
import { Item } from './entities/item.entity';
import { ItemType } from './constants/item.enum';
import { StoriesAPIService } from './stories-api.service';
import { STORIES } from './testing/stories.test';

describe('StoriesController', () => {
  let controller: StoriesController;
  let service: StoriesService;
  let apiService: StoriesAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [StoriesService, StoriesAPIService],
    }).compile();

    controller = module.get<StoriesController>(StoriesController);
    service = module.get<StoriesService>(StoriesService);
    apiService = module.get<StoriesAPIService>(StoriesAPIService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
