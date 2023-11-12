"use client";
import { CalendarIcon, HomeIcon, PlusCircleIcon } from "lucide-react";
import {
  BottomNavigationLink,
  type BottomNavigationLinkProps,
} from "~/app/_components/bottom-navigation-link";
import { SecondaryNavigationLinks } from "~/app/_components/secondary-navigation-links";
import { useAuth } from "~/hooks/use-auth";

const navigationLinkConfigs: BottomNavigationLinkProps[] = [
  {
    Icon: HomeIcon,
    path: "/",
  },
  {
    Icon: CalendarIcon,
    path: "/calendar",
  },
  {
    Icon: PlusCircleIcon,
    path: "/add",
  },
];

export const BottomNavigation = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="flex  w-screen flex-row items-center justify-between self-stretch bg-gradient-to-b from-white/10 to-white/20 px-6 py-2">
      {navigationLinkConfigs.map((config) => (
        <BottomNavigationLink {...config} key={config.path} />
      ))}
      <SecondaryNavigationLinks />
    </div>
  );
};
