import { Entity } from '@/core/entities/entity';

export type CategoryProps = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Category extends Entity<CategoryProps> {
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

  static create(props: Pick<CategoryProps, 'name'>) {
    const now = new Date();
    return new Category({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static from(props: { id: string } & CategoryProps) {
    return new Category(props);
  }
}
