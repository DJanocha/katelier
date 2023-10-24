// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  mysqlTableCreator,
  serial,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `katelier-t3-pnpm_${name}`);

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey().notNull(),
    email: varchar("email", { length: 32 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 150 }),
    phoneNumber: varchar("phone_number", { length: 72 }),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (users) => ({
    emailIndex: uniqueIndex("name_idx").on(users.email),
  }),
);
export const auth = mysqlTable(
  "auth",
  {
    id: serial("id").primaryKey().notNull(),
    userId: int("user_id").notNull(),
    hashedPassword: varchar("hashed_password", { length: 256 }).notNull(),
  },
  (auth) => ({
    userIdIndex: uniqueIndex("name_idx").on(auth.userId),
  }),
);
export const authSelectSchema = auth.$inferSelect