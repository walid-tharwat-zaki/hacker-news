import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { StoriesAPIService } from './stories-api.service';

@Module({
  controllers: [StoriesController],
  providers: [StoriesService, StoriesAPIService],
})
export class StoriesModule {}
