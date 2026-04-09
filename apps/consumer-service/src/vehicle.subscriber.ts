import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class VehicleSubscriber {
  private readonly logger = new Logger(VehicleSubscriber.name);

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_EXCHANGE || 'info_tec.events',
    routingKey: 'vehicle.created',
    queue: 'consumer-service.vehicle.created',
  })
  handleVehicleCreated(payload: unknown) {
    this.logger.log(`Vehicle created: ${JSON.stringify(payload)}`);
  }

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_EXCHANGE || 'info_tec.events',
    routingKey: 'vehicle.updated',
    queue: 'consumer-service.vehicle.updated',
  })
  handleVehicleUpdated(payload: unknown) {
    this.logger.log(`Vehicle updated: ${JSON.stringify(payload)}`);
  }

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_EXCHANGE || 'info_tec.events',
    routingKey: 'vehicle.deleted',
    queue: 'consumer-service.vehicle.deleted',
  })
  handleVehicleDeleted(payload: unknown) {
    this.logger.log(`Vehicle deleted: ${JSON.stringify(payload)}`);
  }
}
