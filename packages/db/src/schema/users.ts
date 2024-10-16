import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar({ length: 255 }),
});

export const UserRelations = relations(Users, ({ many }) => ({
  accounts: many(Accounts),
}));

export type AccountType = "email" | "oauth" | "oidc" | "webauthn";

export const Accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AccountType>().notNull(),
    provider: varchar({ length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar({ length: 255 }),
    access_token: text(),
    expires_at: integer(),
    token_type: varchar({ length: 255 }),
    scope: varchar({ length: 255 }),
    id_token: text(),
    session_state: varchar({ length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(Accounts, ({ one }) => ({
  user: one(Users, { fields: [Accounts.userId], references: [Users.id] }),
}));

export const Sessions = pgTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  expires: timestamp({ mode: "date", withTimezone: true }).notNull(),
});

export const SessionRelations = relations(Sessions, ({ one }) => ({
  user: one(Users, { fields: [Sessions.userId], references: [Users.id] }),
}));
