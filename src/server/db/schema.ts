// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { pgTableCreator, text, timestamp, varchar } from "drizzle-orm/pg-core";
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
