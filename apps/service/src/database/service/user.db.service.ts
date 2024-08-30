import { Injectable } from "@nestjs/common";
import { db } from "database/drizzle";
import type { UserDto } from "database/dto/user.dto";
import { usersTable } from "database/schema";

@Injectable()
export class UserDBService {
  async createUser(user: UserDto) {
    await db.insert(usersTable).values(user)
  }

  findAllUser() {
    return db.select().from(usersTable)
  }
}
