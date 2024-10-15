import { type Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL_NON_POOLING) {
  throw new Error("Missing DATABASE_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL_NON_POOLING;
// .replace(":6543", ":5432");

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: nonPoolingUrl,
  },
  tablesFilter: ["nextjs_*"],
} satisfies Config;
