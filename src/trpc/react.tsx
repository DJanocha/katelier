"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getFetch,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import Cookies from "js-cookie";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers: Headers;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          fetch: (input, init) => {
            const fetcher = getFetch();
            return fetcher(input, { ...init, credentials: "include" });
          },

          headers() {
            const heads = new Map(props.headers);
            heads.set(
              "Authorization",
              `Bearer ${Cookies.get(JwtTokenStorageKey)}`,
            );
            heads.set("x-trpc-source", "react");
            return Object.fromEntries(heads);
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
