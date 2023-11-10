"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { authPages } from "~/constants/auth-pages";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const utils = api.useUtils();
  const { data: meData } = api.auth.getMe.useQuery();
  const me = useMemo((): RouterOutputs["auth"]["getMe"]["me"] | undefined => {
    const isInUnauthorizedPage = authPages.some((authPage) =>
      pathname.endsWith(authPage),
    );
    const jwtCookie = Cookies.get(JwtTokenStorageKey);
    if (!jwtCookie) {
      return;
    }
    if (isInUnauthorizedPage) {
      return;
    }
    return meData?.me;
  }, [meData?.me, pathname]);
  const { mutate: logIn } = api.auth.logIn.useMutation();

  const logOut = useCallback(async () => {
    Cookies.remove(JwtTokenStorageKey);
    await utils.auth.invalidate();

    router.replace("/hello-again");
  }, [router, utils.auth]);
  return { logOut, me, logIn } as const;
};
