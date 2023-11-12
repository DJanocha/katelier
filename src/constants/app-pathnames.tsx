export const appPathnames = [
  "/",
  "/me",
  "/settings",
  "/billings",
  "/support",
  "/calendar",
  "/add",
] as const;

export type AppPathname = (typeof appPathnames)[number];

export const AppPathnames: { [key in AppPathname]: AppPathname } = {
  "/": "/",
  "/me": "/me",
  "/add": "/add",
  "/settings": "/settings",
  "/billings": "/billings",
  "/support": "/support",
  "/calendar": "/calendar",
};
