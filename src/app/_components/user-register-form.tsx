"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  type RegisterFormType,
  registerFormSchema,
} from "~/validation-schemas/auth";
import { useToast } from "~/components/ui/use-toast";
import Link from "next/link";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const { toast } = useToast();
  const { mutate: registerMutate, isLoading: isRegisterMutationLoading } =
    api.auth.register.useMutation({
      onSuccess: () => {
        toast({ title: "registered in successfully" });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Could not register",
          description: error.message,
        });
      },
    });
  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const loginSubmit = React.useCallback<SubmitHandler<RegisterFormType>>(
    (registerFormValues) => {
      registerMutate(registerFormValues);
      console.log({ registerFormValues });
    },
    [registerMutate],
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(loginSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your email..."
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>This is your email .</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="registrationToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret key</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your secret key" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a unique secret, single-user key needed to be able
                    to create an account. Ask admin to acquire one.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isRegisterMutationLoading}>
              {isRegisterMutationLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create an account
            </Button>
            <span className="self-center font-semibold">or </span>

            <Link
              className={buttonVariants({
                variant: "default",
              })}
              href="/hello-again"
            >
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
