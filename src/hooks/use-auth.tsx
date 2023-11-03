"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";

export const useAuth = () => {
  const router = useRouter();
  const logOut = useCallback(() => {
    Cookies.set(JwtTokenStorageKey, "", { expires: 2 });
    router.refresh();
  }, [router]);
  return { logOut } as const;
};
