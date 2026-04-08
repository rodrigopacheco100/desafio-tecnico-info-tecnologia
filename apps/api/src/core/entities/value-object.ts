export abstract class ValueObject<Props> {
  protected props: Props;
  protected abstract validate(): void;

  constructor(props: Props) {
    this.props = props;
    this.validate();
  }

  public toJSON(): ExtractValueObjectProps<Props> {
    const json: any = {};

    for (const key in this.props) {
      const value = this.props[key];

      if (value instanceof ValueObject) {
        json[key] = value.toJSON();
      } else {
        json[key] = value;
      }
    }

    return json;
  }
}
