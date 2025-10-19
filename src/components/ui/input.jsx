import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      pattern,
      required = false,
      isSubmitting = false, // NEW: show errors only on submit
      ...props
    },
    ref
  ) => {
    const validate = (val) => {
      if (!val && required) {
        if (type === "email") return "Email is required";
        if (type === "password") return "Password is required";
        return "This field is required";
      }

      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (val && !emailRegex.test(val)) return "This email is not correct";
      }

      if (type === "password") {
        const pwdPattern = pattern || /^.{6,}$/; // default min 6 chars
        if (val && !pwdPattern.test(val)) return "Password is not correct";
      }

      return "";
    };

    const error = isSubmitting ? validate(value) : "";

    return (
      <div className="flex flex-col w-full">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          {...props}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
