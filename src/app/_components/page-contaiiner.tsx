"use client";

import { type ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center text-white">
      {children}
    </main>
  );
};
