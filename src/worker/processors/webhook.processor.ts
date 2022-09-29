import { Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

import { BaseProcessor } from './base.processor';

export const QUEUE_NAME = 'webhook';
export type Payload = { value: string };

@Processor(QUEUE_NAME)
export class WebhookProcessor extends BaseProcessor {
  constructor(
    @InjectPinoLogger(WebhookProcessor.name)
    private readonly logger: PinoLogger,
  ) {
    super(logger);
  }

  async process(job: Job<Payload>): Promise<void> {
    this.logger.info(job.data);
  }
}
