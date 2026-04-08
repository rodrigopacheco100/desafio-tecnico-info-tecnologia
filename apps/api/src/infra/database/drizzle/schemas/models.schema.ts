import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { brands } from './brands.schema';

export const models = pgTable('models', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  brandId: varchar('brand_id', { length: 36 })
    .notNull()
    .references(() => brands.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});
