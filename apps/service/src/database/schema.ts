import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  nickName: text('nick_name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar').default(''),
  createAt: timestamp('create_at').notNull().defaultNow(),
})

export const messageTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const insertUsersSchema = createInsertSchema(usersTable)
export const selectUsersSchema = createSelectSchema(usersTable)
export const insertMessageSchema = createInsertSchema(messageTable)
export const selectMessageSchema = createSelectSchema(messageTable)

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
export type InsertMessage = typeof messageTable.$inferInsert
export type SelectMessage = typeof messageTable.$inferSelect
