import { authRouter } from "~/server/api/routers/auth-router";
import { createTRPCRouter } from "~/server/api/trpc";
import { imagesRouter } from "./routers/files-router";
import { meRouter } from "./routers/me-router";
import { notesRouter } from "./routers/notes-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  me: meRouter,
  images: imagesRouter,
  notes: notesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
