import { Entity } from '@/core/entities/entity';

export type BrandProps = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Brand extends Entity<BrandProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.setProperty('name', name);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Pick<BrandProps, 'name'>) {
    const now = new Date();
    return new Brand({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static from(props: { id: string } & BrandProps) {
    return new Brand(props);
  }
}
