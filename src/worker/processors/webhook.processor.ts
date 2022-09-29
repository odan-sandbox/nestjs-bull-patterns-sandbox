import { Logger } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

export const QUEUE_NAME = 'webhook';
export type Payload = { value: string };

@Processor(QUEUE_NAME)
export class WebhookProcessor {
  private readonly logger = new Logger(WebhookProcessor.name);

  @Process()
  async process(job: Job<Payload>): Promise<void> {
    this.logger.log(job.data);
  }
}
