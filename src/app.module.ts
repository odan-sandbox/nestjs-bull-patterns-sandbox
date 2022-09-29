import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './worker/job.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    JobModule.registerQueueAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
