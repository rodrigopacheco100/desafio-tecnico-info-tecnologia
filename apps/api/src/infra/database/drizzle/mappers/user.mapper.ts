import { User } from '@/domain/entities/user.entity';
import { users } from '../schemas/users.schema';

export class UserMapper {
  static toDomain(user: typeof users.$inferSelect) {
    return User.from({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toCreateOnDb(user: User): typeof users.$inferInsert {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toUpdateOnDb(user: User): WithoutId<TypedOmit<typeof users.$inferInsert, 'createdAt'>> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: user.updatedAt,
    };
  }
}
