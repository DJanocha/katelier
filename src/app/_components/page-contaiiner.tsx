"use client";

import { type ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {children}
    </main>
  );
};