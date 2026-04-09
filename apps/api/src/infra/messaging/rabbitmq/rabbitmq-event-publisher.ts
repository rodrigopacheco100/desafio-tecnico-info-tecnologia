import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventPublisher } from '@/domain/services/event-publisher';
import type { VehicleEvent } from '@info-tec/broker-contracts';
import { EnvService } from '@/infra/env/env.service';

@Injectable()
export class RabbitMQEventPublisher extends EventPublisher {
  private readonly logger = new Logger(RabbitMQEventPublisher.name);

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly envService: EnvService,
  ) {
    super();
  }

  async publish(event: VehicleEvent): Promise<void> {
    const exchange = this.envService.get('RABBITMQ_EXCHANGE');

    try {
      await this.amqpConnection.publish(
        exchange,
        event.routingKey,
        event.payload,
      );

      this.logger.log(`Event published: ${event.routingKey}`);
    } catch (error) {
      this.logger.error(`Failed to publish event ${event.routingKey}:`, error);
      throw error;
    }
  }
}
