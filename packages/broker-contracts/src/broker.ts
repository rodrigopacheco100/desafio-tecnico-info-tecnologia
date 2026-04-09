export const VehicleRoutingKey = {
  CREATED: 'vehicle.created',
  UPDATED: 'vehicle.updated',
  DELETED: 'vehicle.deleted',
} as const;

export type VehicleRoutingKey = (typeof VehicleRoutingKey)[keyof typeof VehicleRoutingKey];

export interface VehicleCreatedPayload {
  id: string;
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleUpdatedPayload {
  id: string;
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
  updatedAt: Date;
}

export interface VehicleDeletedPayload {
  id: string;
  deletedAt: Date;
}

export interface VehicleCreatedEvent {
  routingKey: typeof VehicleRoutingKey.CREATED;
  payload: VehicleCreatedPayload;
}

export interface VehicleUpdatedEvent {
  routingKey: typeof VehicleRoutingKey.UPDATED;
  payload: VehicleUpdatedPayload;
}

export interface VehicleDeletedEvent {
  routingKey: typeof VehicleRoutingKey.DELETED;
  payload: VehicleDeletedPayload;
}

export type VehicleEvent = VehicleCreatedEvent | VehicleUpdatedEvent | VehicleDeletedEvent;
