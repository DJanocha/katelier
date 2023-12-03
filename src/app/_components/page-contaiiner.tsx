"use client";

import { type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export const PageContainer = ({
  children,
  description,
  title,
  showSeparator,
  className
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  showSeparator?: boolean;
  className?: string;
}) => {
  return (
    <main className={ cn( "flex flex-col items-stretch justify-center gap-4 py-4 text-white h-full w-full")}>
      <div className="w-full text-center">
        {title ? <h3 className="text-lg font-medium">{title}</h3> : null}
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {showSeparator ? <Separator /> : null}
      <div className={cn(  "flex-1 overflow-hidden px-4", className  )}>{children}</div>
    </main>
  );
};
