import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq } from "@pkg/db";
import { CreatePostSchema, Post } from "@pkg/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({ greeting: `Hello ${input.text}` })),
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.Post.findMany({
      orderBy: desc(Post.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.Post.findFirst({
        where: eq(Post.id, input.id),
      });
    }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.Post.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return post ?? null;
  }),

  create: publicProcedure.input(CreatePostSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(Post).values(input);
  }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Post).where(eq(Post.id, input));
  }),
} satisfies TRPCRouterRecord;
