import { Injectable } from '@nestjs/common';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

@Injectable()
export class DatabaseService {
  db = drizzle(sql)
}
