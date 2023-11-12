"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "~/components/ui/button";
import { type AppPathname } from "~/constants/app-pathnames";

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
  const isActive = useMemo(() => pathname === path, [path, pathname]);
  console.log({ pathname, path, isActive });
  return (
    <Button
      key={path}
      className="rounded-full bg-transparent "
      size={"icon"}
      onClick={() => router.push(path)}
    >
      <Icon className="stroke-orange-500" size={40} />
    </Button>
  );
};
