"use client";

import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { JwtTokenStorageKey } from "~/atoms/jwt-token-atom";
import { api } from "~/trpc/react";
export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: meData } = api.auth.getMe.useQuery();
  const me = useMemo(() => meData?.me, [meData?.me]);
  const { mutate: logIn } = api.auth.logIn.useMutation();

  const logOut = useCallback(() => {
    Cookies.remove(JwtTokenStorageKey);
    queryClient.clear();
    router.refresh();
  }, [queryClient, router]);
  return { logOut, me, logIn } as const;
};
