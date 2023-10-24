"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

const registerFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  secretKey: z.string().min(3),
});
type RegisterFormType = z.infer<typeof registerFormSchema>;

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const loginSubmit = React.useCallback<SubmitHandler<RegisterFormType>>(
    (registerFormValues) => {
      console.log({ registerFormValues });
    },
    [],
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(loginSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
            <FormField
              control={registerForm.control}
              name="secretKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret key</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is a unique secret, single-user key needed to be able
                    to create an account. Ask admin to acquire one.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
