import { cn } from "@/lib/utils";
import { forwardRef, useCallback, useEffect, useState } from "react";

const Input = forwardRef(
  (
    {
      className,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      required = false,
      regex,
      regexMessage = "Invalid format",
      isSubmitting = false, // <-- new prop
      ...props
    },
    ref
  ) => {
    const [error, setError] = useState("");

    const validate = useCallback(
      (val) => {
        if (!val && required && isSubmitting) return "This field is required"; // show only on submit
        if (regex && val && !regex.test(val)) return regexMessage;
        return "";
      },
      [regex, required, regexMessage, isSubmitting]
    );

    const handleChange = (e) => {
      const val = e.target.value;
      if (onChange) onChange(e);
      setError(validate(val)); // live validation
    };

    useEffect(() => {
      setError(validate(value));
    }, [value, validate]);

    return (
      <div className="flex flex-col w-full">
        {props.label && (
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-0.5">
            {props.label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
