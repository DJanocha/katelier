"use client";
import { BookImageIcon, CalendarIcon, HomeIcon, PlusCircleIcon } from "lucide-react";
import {
  BottomNavigationLink,
  type BottomNavigationLinkProps,
} from "~/app/_components/bottom-navigation-link";
import { SecondaryNavigationLinks } from "~/app/_components/secondary-navigation-links";
import { useAuth } from "~/hooks/use-auth";

const navigationLinkConfigs: BottomNavigationLinkProps[] = [
  {
    Icon: HomeIcon,
    path: "/preview",
  },
  {
    Icon: CalendarIcon,
    path: "/calendar",
  },
  {
    Icon: PlusCircleIcon,
    path: "/add",
  },
  {
    Icon: BookImageIcon,
    path: "/browse",
  },
];

export const BottomNavigation = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="flex gap-2 py-4  w-full flex-row items-baseline justify-between self-stretch px-6 ">
      {navigationLinkConfigs.map((config) => (
        <BottomNavigationLink {...config} key={config.path} />
      ))}
      <SecondaryNavigationLinks />
    </div>
  );
};
