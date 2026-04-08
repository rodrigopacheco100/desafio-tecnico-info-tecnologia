import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { models } from './models.schema';
import { categories } from './categories.schema';

export const vehicles = pgTable('vehicles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  plate: varchar('plate', { length: 10 }).notNull().unique(),
  chassis: varchar('chassis', { length: 17 }).notNull().unique(),
  renavam: varchar('renavam', { length: 11 }).notNull().unique(),
  modelId: varchar('model_id', { length: 36 })
    .notNull()
    .references(() => models.id),
  categoryId: varchar('category_id', { length: 36 })
    .notNull()
    .references(() => categories.id),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});
