import { uuidv7 } from 'uuidv7';

export abstract class Entity<Props extends object> {
  private readonly _id: string;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props & { id?: string }) {
    const { id, ...rest } = props;
    this.props = rest as Props;
    this._id = id ?? uuidv7();
  }

  public equals(entity: Entity<Props>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
