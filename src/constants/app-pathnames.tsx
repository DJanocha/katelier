export const appPathnames = [
  "/",
  "/me",
  "/settings",
  "/billings",
  "/support",
  "/calendar",
] as const;

export type AppPathname = (typeof appPathnames)[number];

export const AppPathnames: { [key in AppPathname]: AppPathname } = {
  "/": "/",
  "/me": "/me",
  "/settings": "/settings",
  "/billings": "/billings",
  "/support": "/support",
  "/calendar": "/calendar",
};
