"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/button";
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
import { loginFormSchema, type LoginFormType } from "~/validation-schemas/auth";
import { useToast } from "~/components/ui/use-toast";

type UserLoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const registerForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();
  const { mutate: loginMutate, isLoading: isLoginMutationLoading } =
    api.auth.logIn.useMutation({
      onSuccess: () => toast({ title: "successfully loggged in" }),
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
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
                    <Input type="password" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoginMutationLoading}>
              {isLoginMutationLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
