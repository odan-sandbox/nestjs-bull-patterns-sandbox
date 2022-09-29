import { Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ulid } from 'ulid';
import { storage, Store } from 'nestjs-pino/storage';
import { pino } from 'pino';

export abstract class BaseProcessor {
  @Process()
  async onProcess(job: Job<unknown>): Promise<void> {
    const id = ulid();

    const logger = pino({ base: { id } });

    await storage.run(new Store(logger), async () => {
      await this.process(job);
    });
  }

  abstract process(job: Job<unknown>): Promise<void>;
}
