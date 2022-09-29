import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ulid } from 'ulid';
import { storage, Store } from 'nestjs-pino/storage';
import { pino } from 'pino';
import { PinoLogger } from 'nestjs-pino';

export abstract class BaseProcessor {
  constructor(private readonly childLogger: PinoLogger) {}

  @Process()
  async onProcess(job: Job<unknown>): Promise<void> {
    const id = ulid();

    const logger = pino({ base: { id } });

    await storage.run(new Store(logger), async () => {
      await this.process(job);
    });
  }

  abstract process(job: Job<unknown>): Promise<void>;

  @OnQueueError()
  onQueueError(error: Error) {
    this.childLogger.warn({ error, event: 'onQueueError' });
  }

  @OnQueueActive()
  onQueueActive(job: Job<unknown>) {
    this.childLogger.info({ job, event: 'onQueueActive' });
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job<unknown>, result: unknown) {
    this.childLogger.info({ job, result, event: 'onQueueCompleted' });
  }

  @OnQueueFailed()
  onQueueFailed(job: Job<unknown>, error: Error) {
    this.childLogger.error({ job, error, event: 'onQueueFailed' });
  }
}
