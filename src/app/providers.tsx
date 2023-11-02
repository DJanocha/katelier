"use client";

import { Provider as JotaiProvider } from "jotai";
import { type ReactNode } from "react";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export const Providers = ({
  children,
  headers,
}: {
  children: ReactNode;
  headers: Headers;
}) => {
  return (
    <JotaiProvider>
      <TRPCReactProvider headers={headers}>
        <>
          <Toaster />
          {children}
        </>
      </TRPCReactProvider>
    </JotaiProvider>
  );
};
