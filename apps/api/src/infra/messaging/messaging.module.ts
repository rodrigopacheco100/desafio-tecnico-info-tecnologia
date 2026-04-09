import { Module, Global } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EventPublisher } from '@/domain/services/event-publisher';
import { RabbitMQEventPublisher } from './rabbitmq/rabbitmq-event-publisher';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        exchanges: [
          {
            name: envService.get('RABBITMQ_EXCHANGE'),
            type: 'topic',
          },
        ],
        uri: envService.get('RABBITMQ_URL'),
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  providers: [
    {
      provide: EventPublisher,
      useClass: RabbitMQEventPublisher,
    },
  ],
  exports: [EventPublisher, RabbitMQModule],
})
export class MessagingModule {}
