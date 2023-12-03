import { transformArrayToObject } from "~/lib/transformers";

export const appPathnames = [
  "/",
  "/me",
  "/settings",
  "/billings",
  "/support",
  "/calendar",
  "/add",
  "/add/photo",
  "/add/note",
  "/browse",
  "/browse/photos",
  "/browse/notes",
] as const;

export type AppPathname = (typeof appPathnames)[number];
export const AppPathnames = transformArrayToObject(appPathnames)