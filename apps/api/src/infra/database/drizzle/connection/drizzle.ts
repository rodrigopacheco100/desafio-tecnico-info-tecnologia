import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schemas';
import { EnvService } from '@/infra/env/env.service';
import { Injectable } from '@nestjs/common';

export abstract class DrizzleDB {
  abstract connection: NodePgDatabase<typeof schema>;
}

@Injectable()
export class DrizzleDBImpl implements DrizzleDB {
  connection: NodePgDatabase<typeof schema>;

  constructor(private readonly envService: EnvService) {
    const pool = new Pool({
      host: this.envService.get('DATABASE_HOST'),
      port: this.envService.get('DATABASE_PORT'),
      user: this.envService.get('DATABASE_USER'),
      password: this.envService.get('DATABASE_PASSWORD'),
      database: this.envService.get('DATABASE_NAME'),
    });

    this.connection = drizzle(pool, { schema });
  }
}
