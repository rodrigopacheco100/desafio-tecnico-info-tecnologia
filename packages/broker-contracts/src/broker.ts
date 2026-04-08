export interface BrokerMessage {
  id: string;
  topic: string;
  payload: unknown;
  timestamp: Date;
}

export interface BrokerConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export enum BrokerStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}
