import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { utapi } from "@/server/uploadthing";

export const postRouter = createTRPCRouter({
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

  deleteImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await utapi.deleteFiles(input);
    }),
});
