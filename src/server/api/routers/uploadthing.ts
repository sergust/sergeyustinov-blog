import { utapi } from "@/server/uploadthing";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const uploadThingRouter = createTRPCRouter({
  deleteImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return await utapi.deleteFiles(input);
    }),
});
