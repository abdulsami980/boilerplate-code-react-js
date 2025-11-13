import { useState } from "react";

export default function Tabs({
  tabs = [],
  defaultValue = null,
  onTabChange = () => {},
  className = "",
}) {
  const [activeTab, setActiveTab] = useState(
    defaultValue || (tabs[0] && tabs[0].value)
  );

  const handleTabClick = (value) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Tab buttons */}
      <div className="flex gap-4 my-2 py-2 overflow-x-auto px-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`
        relative flex items-center justify-center whitespace-nowrap
        px-6 py-2 rounded-full font-medium text-sm transition-all
        transform-gpu
        ${
          activeTab === tab.value
            ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)] scale-105"
            : "bg-gray-200 text-green-600 hover:bg-gray-300 shadow-sm cursor-pointer hover:scale-[1.03]"
        }
      `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`
            ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full
            ${
              activeTab === tab.value
                ? "bg-white text-emerald-500 shadow-sm"
                : "bg-emerald-100 text-emerald-600"
            }
          `}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="w-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.value && (
              <div key={tab.value} className="w-full">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
