import { Injectable } from '@nestjs/common'
import { db } from 'database/drizzle'
import { type InsertMessage, insertMessageSchema, messageTable, usersTable } from 'database/schema'
import { desc, eq, gt } from 'drizzle-orm'

@Injectable()
export class MessageDBService {
  async addMessage(message: InsertMessage) {
    message = insertMessageSchema.parse(message)
    await db.insert(messageTable).values(message)
    return message
  }

  deleteMessage(messageId: string) {
    return db.delete(messageTable).where(eq(messageTable.content, messageId))
  }

  async findAll(params: { start?: number, size?: number }) {
    const { size = 10, start } = params

    const messagesDesc = db.select().from(messageTable).orderBy(desc(messageTable.createdAt))
    const messages = await (
      start
        ? messagesDesc.where(gt(messageTable.id, start))
        : messagesDesc
    )
      .limit(size)
      .leftJoin(usersTable, eq(usersTable.id, messageTable.userId))

    return messages.map((message) => {
      const { userId, ...rest } = message.messages

      return {
        ...rest,
        user: message.users,
      }
    })
  }
}
