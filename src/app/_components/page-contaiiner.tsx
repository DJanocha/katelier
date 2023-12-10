"use client";

import { forwardRef, type ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
type PageContainerProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  showSeparator?: boolean;
  className?: string;
}

export const PageContainer = forwardRef<React.ElementRef<'div'>, PageContainerProps>(
  ({ children, description, title, showSeparator, className }, ref) => {
    return (
      <main className={cn("flex flex-col items-stretch justify-center gap-4 py-4 text-white h-full w-full")} >
        <div className="w-full text-center">
          {title ? <h3 className="text-lg font-medium">{title}</h3> : null}
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {showSeparator ? <Separator /> : null}
        <div className={cn("flex-grow overflow-hidden px-4 ", className)} ref={ref}>{children}</div>
      </main>
    );
  }
);

PageContainer.displayName = "PageContainer";