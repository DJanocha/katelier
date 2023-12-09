"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import { AppPathnames, type AppPathname } from "~/constants/app-pathnames";
import { cn } from "~/lib/utils";

export type BottomNavigationLinkProps = {
  path: AppPathname;
  Icon: LucideIcon;
};
export const BottomNavigationLink = ({
  Icon,
  path,
}: BottomNavigationLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = useMemo(() => pathname.startsWith(path), [path, pathname]);
  return (
    <Button
      key={path}
      className={cn(" opacity-30 focus-within:opacity-100 p-1 flex-1  outline-none focus-visible:ring-transparent backdrop-blur-lg  focus-visible:stroke-blue-400 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0",
        isActive && 'scale-125 opacity-100')}
      size={"icon"}
      onClick={() => router.push(path)}
    >
      <Icon
        className={cn('bg-transparent h-10 w-10  ', isActive ? "stroke-orange-500" : "stroke-white")}
        style={{ outline: 'none' }}
      />
    </Button >
  );
};
