"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { JwtTokenStorageKey, jwtTokenAtom } from "~/atoms/jwt-token-atom";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { loginFormSchema, type LoginFormType } from "~/validation-schemas/auth";

type UserLoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const router = useRouter();
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();
  const setJwtToken = useSetAtom(jwtTokenAtom);
  const { mutate: loginMutate, isLoading: isLoginMutationLoading } =
    api.auth.logIn.useMutation({
      onSuccess: ({ token }) => {
        toast({ title: "successfully loggged in" });
        setJwtToken(token);
        Cookies.set(JwtTokenStorageKey, token, {
          expires: 60 * 60 * 24 * 365 /* one year */,
        });
        router.push("/");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Failed to log in",
          description: error.message,
        });
      },
    });

  const loginSubmit = React.useCallback<SubmitHandler<LoginFormType>>(
    (loginFormValues) => loginMutate(loginFormValues),
    [loginMutate],
  );
  const [jwtToken] = useAtom(jwtTokenAtom);
  console.log({ jwtTokenInLoginUserForm: jwtToken });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(loginSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your email..." {...field} />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoginMutationLoading} type="submit">
              {isLoginMutationLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
            <span className="self-center text-xl">or </span>

            <Link
              className={buttonVariants({
                variant: "default",
              })}
              href="/hello"
            >
              Create account
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
