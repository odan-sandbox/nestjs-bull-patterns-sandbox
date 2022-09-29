import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE_NAME, Payload } from './worker/processors/webhook.processor';

@Injectable()
export class AppService {
  constructor(@InjectQueue(QUEUE_NAME) private webhookQueue: Queue<Payload>) {}

  async getHello(): Promise<string> {
    await this.webhookQueue.add({ value: 'hello' });
    return 'Hello World!';
  }
}
