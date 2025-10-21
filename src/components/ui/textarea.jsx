import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      className,
      label,
      name,
      value,
      onChange,
      placeholder,
      required = false,
      isSubmitting = false,
      ...props
    },
    ref
  ) => {
    const validate = (val) =>
      !val && required ? "This field is required" : "";
    const error = isSubmitting ? validate(value) : "";

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-0.5">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "flex w-full rounded-md border px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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

Textarea.displayName = "Textarea";
export { Textarea };
