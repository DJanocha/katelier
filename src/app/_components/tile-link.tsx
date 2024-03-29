"use client";

import Link from "next/link";
import { type ReactNode, type ComponentProps } from "react";
import { cn } from "~/lib/utils";
export const TileLink = ({
  className,
  title,
  description,
  children = null,
  ...linkProps
}: Omit<ComponentProps<typeof Link>, "children"> & {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <Link
      className={cn(
        "flex max-w-xs flex-col gap-4 rounded-xl bg-white/40 backdrop-blur-2xl border-white/20 border p-4 hover:bg-white/20 focus-visible:neon-orange focus:scale-105",
        className,
      )}
      {...linkProps}
    >
      {title ? <div className="text-2xl font-bold">{title}</div> : null}
      {description ? <div className="text-lg">{description}</div> : null}
      {children}
    </Link>
  );
};
