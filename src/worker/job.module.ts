import { Module, DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import {
  QUEUE_NAME as WEBHOOK_QUEUE_NAME,
  WebhookProcessor,
} from './processors/webhook.processor';

@Module({})
export class JobModule {
  private static createQueueModule(name: string): DynamicModule {
    return BullModule.registerQueueAsync({
      name,
    });
  }
  static registerQueueAsync(): DynamicModule {
    const queueModule = this.createQueueModule(WEBHOOK_QUEUE_NAME);
    return {
      ...queueModule,
      providers: [],
      imports: [queueModule],
      exports: [queueModule],
    };
  }
  static registerWorkerAsync(): DynamicModule {
    const queueModule = this.createQueueModule(WEBHOOK_QUEUE_NAME);
    return {
      ...queueModule,
      providers: [WebhookProcessor],
      imports: [queueModule],
      exports: [queueModule],
    };
  }
}
