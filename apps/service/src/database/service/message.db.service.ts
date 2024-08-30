import { Injectable } from "@nestjs/common";
import { db } from "database/drizzle";
import type { MessageDto } from "database/dto/message.dto";
import { messageTable, usersTable } from "database/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class MessageDBService {
  addMessage(message: MessageDto) {
    db.insert(messageTable).values(message)
  }

  deleteMessage(messageId: string) {
    db.delete(messageTable).where(eq(messageTable.content, messageId))
  }

  findAll() {
    return db
      .select()
      .from(messageTable)
      .leftJoin(usersTable, eq(usersTable.id, messageTable.id))
  }
}
