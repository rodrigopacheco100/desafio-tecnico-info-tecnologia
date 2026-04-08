import { Entity } from '@/core/entities/entity';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.setProperty('name', name);
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.setProperty('email', email);
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.setProperty('password', password);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: TypedOmit<UserProps, 'createdAt' | 'updatedAt'>) {
    const now = new Date();

    return new User({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static from(props: WithId<UserProps>) {
    return new User(props);
  }
}
