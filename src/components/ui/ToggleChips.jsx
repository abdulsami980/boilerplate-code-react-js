import { cn } from "@/lib/utils";

export default function ToggleChips({
  options = [],
  selected = [],
  onChange,
  label,
}) {
  const handleToggle = (value) => {
    if (!onChange) return;
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
          const isActive = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleToggle(opt)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200",
                isActive
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
