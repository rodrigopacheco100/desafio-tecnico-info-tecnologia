import type { VehicleEvent } from '@info-tec/broker-contracts';

export abstract class EventPublisher {
  abstract publish(event: VehicleEvent): Promise<void>;
}
