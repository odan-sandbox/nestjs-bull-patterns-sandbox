import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

export const QUEUE_NAME = 'webhook';
export type Payload = { value: string };

@Processor(QUEUE_NAME)
export class WebhookProcessor {
  @Process()
  async process(job: Job<Payload>): Promise<void> {
    console.log(job.data);
  }
}
