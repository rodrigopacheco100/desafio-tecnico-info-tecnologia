import { type ValueObject } from '@/core/entities/value-object';

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;

  type WithId<T> = T & { id: string };
  type WithoutId<T> = Omit<T, 'id'>;

  type ExtractValueObjectProps<T> =
    T extends ValueObject<infer P>
      ? { [K in keyof P]: ExtractValueObjectProps<P[K]> }
      : T extends object
        ? { [K in keyof T]: ExtractValueObjectProps<T[K]> }
        : T;

  type MessageContent<T> = {
    [K in keyof T]: T[K] extends Date | null | undefined
      ? T[K] extends Date
        ? string
        : T[K] extends Date | null
          ? string | null
          : T[K] extends Date | undefined
            ? string | undefined
            : T[K] extends Date | null | undefined
              ? string | null | undefined
              : T[K]
      : T[K] extends object
        ? MessageContent<T[K]>
        : T[K];
  };

  namespace Express {
    export interface Request {
      user: {
        userId: string;
      };
    }
  }
}
