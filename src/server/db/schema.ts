// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { MOOD_VALUES } from "@/features/notes/schemas";

import {
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
export const createTable = pgTableCreator((name) => `moodifier_${name}`);

export const users = createTable("user", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
});

export const sessions = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const moodEnum = pgEnum("mood", MOOD_VALUES);
export const notes = createTable("note", {
  id: serial("id").primaryKey(),
  mood: moodEnum("mood").notNull().default("happy"),
  body: text("body").notNull(),
  date: text("date").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});
