import { EventPublisher } from '../event-publisher';

export const mockEventPublisher: EventPublisher = {
  publish: vi.fn().mockResolvedValue(undefined),
};
