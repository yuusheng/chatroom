import { Injectable } from '@nestjs/common'
import { db } from 'database/drizzle'
import { type InsertMessage, insertMessageSchema, messageTable } from 'database/schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class MessageDBService {
  async addMessage(message: InsertMessage) {
    message = insertMessageSchema.parse(message)
    await db.insert(messageTable).values(message)
    return message
  }

  deleteMessage(messageId: string) {
    db.delete(messageTable).where(eq(messageTable.content, messageId))
  }

  async findAll() {
    const messages = await db
      .select()
      .from(messageTable)
    return messages
  }
}
