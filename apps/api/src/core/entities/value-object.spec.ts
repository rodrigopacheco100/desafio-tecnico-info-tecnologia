import { ValueObject } from './value-object';

interface TestProps {
  foo: string;
  bar: number;
}

class TestValueObject extends ValueObject<TestProps> {
  protected validate(): void {
    if (this.props.bar < 0) {
      throw new Error('Bar must be positive');
    }
  }

  static create(props: TestProps) {
    return new TestValueObject(props);
  }
}

interface NestedProps {
  name: string;
  test: TestValueObject;
}

class NestedValueObject extends ValueObject<NestedProps> {
  protected validate(): void {}

  static create(props: NestedProps) {
    return new NestedValueObject(props);
  }
}

describe(ValueObject.name, () => {
  it('should be able to create a value object', () => {
    const vo = TestValueObject.create({ foo: 'bar', bar: 1 });
    expect(vo).toBeDefined();
  });

  it('should validate props on creation', () => {
    expect(() => TestValueObject.create({ foo: 'bar', bar: -1 })).toThrow(
      'Bar must be positive',
    );
  });

  it('should be able to convert to JSON', () => {
    const vo = TestValueObject.create({ foo: 'bar', bar: 1 });
    const json = vo.toJSON();

    expect(json).toEqual({ foo: 'bar', bar: 1 });
  });

  it('should recursively convert nested value objects to JSON', () => {
    const innerVo = TestValueObject.create({ foo: 'bar', bar: 1 });
    const outerVo = NestedValueObject.create({ name: 'nested', test: innerVo });

    const json = outerVo.toJSON();

    expect(json).toEqual({
      name: 'nested',
      test: {
        foo: 'bar',
        bar: 1,
      },
    });
  });
});
