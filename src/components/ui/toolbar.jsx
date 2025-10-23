import { useState } from "react";
import { Input } from "./input";
import { Search } from "lucide-react";
import { Button } from "./button";

export default function ToolBar({
  title = "",
  subtitle = "",
  showSearch = false,
  onSearch = () => {},
  children,
  actions = [], // array of { label, icon, onClick, color }
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full">
      {/* Glow Background */}
      <div
        className={`absolute inset-0 -z-10  opacity-20 blur-3xl pointer-events-none`}
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 text-sm md:text-base mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-3 md:mt-0">
          {showSearch && (
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="pr-10 shadow-sm rounded-lg border-gray-200"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          )}

          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actions.map((a, idx) => (
                <Button
                  key={idx}
                  variant="default"
                  size="sm"
                  onClick={a.onClick}
                  className={`flex items-center gap-2 bg-${a.color}-500 hover:bg-${a.color}-600 text-white`}
                >
                  {a.icon && <a.icon size={16} />}
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider with glow */}
      <div className="relative border-t border-green-400/30 mb-0">
        <div className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 opacity-50 blur-md rounded-full" />
      </div>

      {/* Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
}
