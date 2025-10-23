import React from "react";
import Chart from "react-apexcharts";

export default function ApprovalRateGauge({ value = 0 }) {
  const options = {
    chart: { toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        hollow: { size: "70%" },
        track: { background: "#f1f5f9", strokeWidth: "100%" },
        dataLabels: {
          showOn: "always",
          name: { show: true, offsetY: 50, color: "#10354a", fontSize: "13px" },
          value: {
            color: "#10354a",
            fontSize: "28px",
            fontWeight: 600,
            offsetY: -10,
            formatter: (v) => `${Math.round(v)}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#15803d"],
        stops: [0, 100],
      },
    },
    colors: ["#22c55e"],
  };

  const series = [value];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h5 className="text-sm font-semibold text-[#10354a] mb-4 flex items-center justify-between">
        <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
          Approval Rate
        </h5>

        <span className="text-xs text-[#16a34a] bg-[#4ade80]/20 px-2 py-0.5 rounded">
          Updated 2h ago
        </span>
      </h5>
      <div className="flex flex-col items-center justify-center">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={220}
        />
        <p className="text-sm text-gray-500 mt-1">
          Current Approval Efficiency
        </p>
      </div>
    </div>
  );
}
