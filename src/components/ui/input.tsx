import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div
        className={cn(
          "group flex h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-200 aria-disabled:opacity-50",
          className,
        )}
        aria-disabled={props.disabled}
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
          className="h-full w-full bg-transparent outline-none disabled:cursor-not-allowed"
          ref={ref}
          {...props}
        />
        <span
          onClick={() => setShowPassword((x) => !x)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { Input, InputPassword };
