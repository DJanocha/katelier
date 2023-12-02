"use client";

import { type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";

export const PageContainer = ({
  children,
  description,
  title,
  showSeparator,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  showSeparator?: boolean;
}) => {
  return (
    <main className="flex flex-col items-center justify-center p-4 text-white h-full">
      <div className="my-4 w-full ">
        {title ? <h3 className="text-lg font-medium">{title}</h3> : null}
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {showSeparator ? <Separator /> : null}
      <div className="flex-1 ">{children}</div>
    </main>
  );
};
