import { table, text, integer } from 'sdk/db';

export const users = table('users', {
  id: text('_id').primaryKey(),
  data: text('data').notNull(),
  reset: integer('reset').default(0),
  updatedAt: integer('updatedAt'),
});

export const kv = table('kv', {
  id: text('_id').primaryKey(),
  data: text('data').notNull(),
  reset: integer('reset').default(0),
  updatedAt: integer('updatedAt'),
});

export const battles = table('battles', {
  id: text('_id').primaryKey(),
  data: text('data').notNull(),
  reset: integer('reset').default(0),
  updatedAt: integer('updatedAt'),
});

export const sessions = table('sessions', {
  id: text('_id').primaryKey(),
  data: text('data').notNull(),
  reset: integer('reset').default(0),
  updatedAt: integer('updatedAt'),
});
