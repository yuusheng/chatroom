import process from 'node:process'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { messageTable, usersTable } from './schema'

config({ path: ['.env.local', '.env'] })

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, {
  schema: {
    users: usersTable,
    messages: messageTable,
  },
})
