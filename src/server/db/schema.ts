// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `katelier-t3-pnpm_${name}`,
);

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
export const authSelectSchema = auth.$inferSelect;

export const registrationTokens = mysqlTable("registration_tokens", {
  id: serial("id").primaryKey().notNull(),
  token: varchar("token", { length: 256 }).notNull(),
  usedBy: int("used_by"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  usedAt: timestamp("used_at"),
});

export const photos = mysqlTable(
  "photos",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    url: varchar("url", { length: 256 }).notNull(),
    ownerId: int("owner_id").notNull(),
    size: int("size").notNull(),
    description: varchar("description", { length: 256 }).notNull().default(""),
  },
  (photos) => ({
    photosOwnerIdIndex: index("photos_owner_id").on(photos.ownerId),
    photosNameIndex: index("photos_name").on(photos.name),
  }),
);
export const notes = mysqlTable(
  "notes",
  {
    id: serial("id").primaryKey().notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    ownerId: int("owner_id").notNull(),
    description: varchar("description", { length: 256 }).notNull().default(""),
  },
  (notes) => ({
    notesOwnerIdIndex: index("notes_owner_id").on(notes.ownerId),
    contentUniqueIndex: uniqueIndex("content_unique").on(notes.content),
  }),
);

export const drafts = mysqlTable(
  "drafts",
  {
    id: serial("id").primaryKey().notNull(),
    noteId: int("note_id"),
    photoId: int("photo_id"),
    ownerId: int("owner_id").notNull(),
  },
  (drafts) => ({
    draftOwnerIdIndex: index("drafts_owner_id").on(drafts.ownerId),
  }),
);

