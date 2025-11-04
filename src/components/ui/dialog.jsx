import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------- STATIC SHADCN BASE -------- */

const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* -------- SIZE MAP -------- */

const sizeClasses = {
  sm: "w-[300px] sm:w-[380px] max-w-[90vw]",
  md: "w-[450px] sm:w-[520px] max-w-[90vw]",
  lg: "w-[650px] sm:w-[720px] max-w-[90vw]",
  xl: "w-[900px] sm:w-[1080px] max-w-[95vw]",
};

/* -------- MODAL WRAPPER -------- */

function DialogWrapper({
  show = false,
  headerTitle,
  onHide = () => {},
  actions = [],
  size = "xl",
  className = "",
  children,
}) {
  return (
    <DialogPrimitive.Root open={show} onOpenChange={onHide}>
      <DialogPortal>
        <DialogOverlay />

        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50",
            "w-full",
            "translate-x-[-50%] translate-y-[-50%]",
            "rounded-xl overflow-hidden",
            "border border-green-300 bg-white",
            "shadow-xl shadow-green-300/50",
            "flex flex-col max-h-[90vh]",
            "animate-in zoom-in-90 fade-in",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90",
            "data-[state=open]:fade-in data-[state=closed]:fade-out",
            sizeClasses[size],
            className
          )}
        >
          {/* Header */}
          {headerTitle && (
            <div className="flex items-center justify-between px-5 py-4 bg-green-50 border-b border-green-200">
              <h2 className="text-lg font-semibold text-green-600">
                {headerTitle}
              </h2>
              <DialogClose className="opacity-80 hover:opacity-100 text-green-500 hover:text-green-700 p-1">
                <X className="h-5 w-5 cursor-pointer" />
              </DialogClose>
            </div>
          )}

          {/* Body (scrollable if long text) */}
          <div className="p-6 overflow-y-auto text-gray-800 flex-1">
            {children}
          </div>

          {/* Footer */}
          {actions?.length > 0 && (
            <div className="flex justify-end gap-2 px-5 py-4 bg-green-50 border-t border-green-200">
              {actions.map((btn, i) => (
                <Button
                  key={i}
                  onClick={btn.onClick}
                  variant={btn.variant || "default"}
                  disabled={btn.disabled}
                  className={btn.className}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}

/* -------- EXPORT WRAPPER -------- */
export { DialogWrapper as Dialog };
