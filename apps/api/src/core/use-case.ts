import { type BaseError } from './base-error';
import { type Either } from './either';

export interface UseCase {
  execute: (...args: any[]) => Promise<Either<BaseError, any>>;
}
