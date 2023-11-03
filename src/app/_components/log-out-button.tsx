"use client";

import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/use-auth";

export const LogOutButton = () => {
  const { logOut } = useAuth();
  return <Button onClick={logOut}>Log out</Button>;
};
