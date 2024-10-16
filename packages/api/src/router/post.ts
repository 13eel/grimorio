import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({ greeting: `Hello ${input.text}` })),
  secret: protectedProcedure.query(() => ({ message: "Jabberwocky" })),
} satisfies TRPCRouterRecord;
