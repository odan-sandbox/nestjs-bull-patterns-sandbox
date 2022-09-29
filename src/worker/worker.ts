import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { QueueModule } from './queue.module';

@Module({
  imports: [QueueModule.registerProcessorAsync()],
})
export class WorkerModule {}

async function bootstrap(): Promise<void> {
  console.log('start worker');
  const app = await NestFactory.create(WorkerModule);

  await app.init();
}

bootstrap();

process.on('unhandledRejection', (reason) => {
  console.error(reason);
  process.exit(1);
});
