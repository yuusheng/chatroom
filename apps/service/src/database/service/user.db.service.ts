import { Injectable } from "@nestjs/common";
import { db } from "database/drizzle";
import { insertUsersSchema, usersTable, type InsertUser } from "database/schema";

@Injectable()
export class UserDBService {
  async createUser(user: InsertUser) {
    insertUsersSchema.parse(user)
    await db.insert(usersTable).values(user)
  }

  findAllUser() {
    return db.select().from(usersTable)
  }
}
