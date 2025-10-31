import { cn } from "@/lib/utils";

export default function ToggleChips({
  options = [],
  selected = [],
  onChange,
  label,
  disabled = false,
}) {
  const handleToggle = (value) => {
    if (disabled || !onChange) return;

    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="mt-6">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = selected.includes(opt.value);

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleToggle(opt.value)}
              disabled={disabled}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200",
                isActive
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100",
                disabled && "opacity-60 cursor-not-allowed"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
