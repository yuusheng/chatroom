import process from 'node:process'
import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: ['.env.local', '.env'] })

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
