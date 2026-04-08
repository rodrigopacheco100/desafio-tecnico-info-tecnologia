import { createId } from '@paralleldrive/cuid2';
import { Entity } from './entity';

interface TestProps {
  foo: string;
  bar: number;
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps) {
    return new TestEntity(props);
  }

  static from(props: WithId<TestProps>) {
    return new TestEntity(props);
  }

  get foo() {
    return this.props.foo;
  }

  set foo(value: string) {
    this.props.foo = value;
  }
}

describe(Entity.name, () => {
  it('should be able to create an entity with a random id', () => {
    const entity = TestEntity.create({ foo: 'bar', bar: 1 });

    expect(entity.id).toBeDefined();
    expect(typeof entity.id).toBe('string');
  });

  it('should be able to create an entity with a specific id', () => {
    const id = createId();
    const entity = TestEntity.from({ foo: 'bar', bar: 1, id });

    expect(entity.id).toBe(id);
  });

  it('should be able to compare entities for equality', () => {
    const id = createId();
    const entity1 = TestEntity.from({ foo: 'bar', bar: 1, id });
    const entity2 = TestEntity.from({ foo: 'baz', bar: 2, id });
    const entity3 = TestEntity.create({ foo: 'bar', bar: 1 });

    expect(entity1.equals(entity1)).toBe(true);
    expect(entity1.equals(entity2)).toBe(true);
    expect(entity1.equals(entity3)).toBe(false);
  });
});
