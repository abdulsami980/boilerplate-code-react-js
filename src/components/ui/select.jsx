import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef(
  (
    {
      className,
      label,
      name,
      value,
      onChange,
      placeholder = "Select option",
      options = [],
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
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-0.5"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <SelectPrimitive.Root
          value={value || ""}
          onValueChange={(val) => onChange(val)}
          {...props}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            name={name}
            className={cn(
              "flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500"
                : "border-gray-300 focus:border-green-500",
              className
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-800 shadow-lg">
              <SelectPrimitive.Viewport className="p-1">
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm text-gray-700 outline-none focus:bg-green-100 focus:text-green-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <SelectPrimitive.ItemText>
                      {opt.label}
                    </SelectPrimitive.ItemText>
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 text-green-600" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
