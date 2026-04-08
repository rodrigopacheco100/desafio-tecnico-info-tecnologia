import { UserRepository } from '@/domain/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { users } from '../schemas';
import { UserMapper } from '../mappers/user.mapper';
import { DrizzleDB } from '../connection/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly drizzle: DrizzleDB) {}

  async save(user: User): Promise<void> {
    await this.drizzle.connection
      .insert(users)
      .values(UserMapper.toCreateOnDb(user))
      .onConflictDoUpdate({
        target: users.id,
        set: UserMapper.toUpdateOnDb(user),
      });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.drizzle.connection.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
