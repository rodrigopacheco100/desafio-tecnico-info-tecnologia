import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  // APP
  NODE_ENV: z.enum(['local', 'development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_NAME: z.string().default('info_tec_dev'),
  JWT_SECRET: z.string().default('jwt_secret'),
});

export type Env = z.infer<typeof envSchema>;
export const envs = envSchema.parse(process.env);
