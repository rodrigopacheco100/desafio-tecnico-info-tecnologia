import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { VehicleSubscriber } from './vehicle.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMQModule.forRootAsync({
      useFactory: () => ({
        exchanges: [
          {
            name: process.env.RABBITMQ_EXCHANGE ?? 'info_tec.events',
            type: 'topic',
          },
        ],
        uri: process.env.RABBITMQ_URL ?? 'amqp://info_tec:info_tec_secret@localhost:5672',
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  providers: [VehicleSubscriber],
})
export class AppModule {}
