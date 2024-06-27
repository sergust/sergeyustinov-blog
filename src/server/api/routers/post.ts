import { Block } from "@blocknote/core";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().optional(),
        content: z.string(),
        pictureUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // if slug is empty, generate one from name
      if (!input.slug) {
        input.slug = input.title.toLowerCase().replace(/\s+/g, "-");
      }

      console.log(input.content);

      return ctx.db.post.create({
        data: {
          name: input.title,
          createdById: ctx.userId,
          slug: input.slug,
          content: input.content,
          pictureUrl: input.pictureUrl,
        },
      });
    }),

  getLatestPreviews: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    const previews = posts.map((post) => ({
      ...post,
      content: post.content.substring(0, 100),
    }));

    return previews;
  }),
});
