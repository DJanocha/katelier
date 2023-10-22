"use client";

import Link, { type LinkProps } from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const LinkButton = ({
  href,
  label,
}: Pick<LinkProps, "href"> & { label: string }) => (
  <Link
    href={href}
    className={cn(
      buttonVariants({ variant: "ghost" }),
      "absolute right-4 top-4 md:right-8 md:top-8",
    )}
  >
    {label}
  </Link>
);
