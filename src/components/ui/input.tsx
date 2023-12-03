import * as React from "react";

import { cn } from "~/lib/utils";
import { type TypedOmit } from "~/types/helpers";

type InputValue = React.ComponentProps<'input'>['value'] | null
export type InputProps = TypedOmit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & { value: InputValue }


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value: nullishValue, type, ...props }, ref) => {

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-normal text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        value={nullishValue === null ? undefined : nullishValue}

        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
