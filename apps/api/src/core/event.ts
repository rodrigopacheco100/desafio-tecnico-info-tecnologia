export type EventPayload<T> = MessageContent<{
  content: T;
  emittedAt: Date;
}>;

export abstract class EventEmitter<T extends EventPayload<any>> {
  abstract topicName: string;
  abstract emit(content: T['content']): void;
}
