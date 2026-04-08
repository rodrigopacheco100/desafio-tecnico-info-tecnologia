import { Entity } from '@/core/entities/entity';

export type ModelProps = {
  name: string;
  brandId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Model extends Entity<ModelProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.setProperty('name', name);
  }

  get brandId() {
    return this.props.brandId;
  }

  set brandId(brandId: string) {
    this.setProperty('brandId', brandId);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Pick<ModelProps, 'name' | 'brandId'>) {
    const now = new Date();
    return new Model({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static from(props: { id: string } & ModelProps) {
    return new Model(props);
  }
}
