import { defineConfig } from 'drizzle-kit';
import { envs } from './src/infra/env/env';

export default defineConfig({
  schema: './src/infra/database/drizzle/schemas/*.ts',
  out: './src/infra/database/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: envs.DATABASE_HOST,
    user: envs.DATABASE_USER,
    password: envs.DATABASE_PASSWORD,
    database: envs.DATABASE_NAME,
    port: envs.DATABASE_PORT,
  },
  verbose: true,
  strict: true,
});
