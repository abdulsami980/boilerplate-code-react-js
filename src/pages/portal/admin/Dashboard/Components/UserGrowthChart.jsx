// src/components/UserGrowthChart.jsx
import React from "react";
import Chart from "react-apexcharts";

export default function UserGrowthChart({ data }) {
  const colors = ["#16a34a", "#22c55e"];

  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: data.labels,
      labels: { style: { colors: "#64748b", fontWeight: 500 } },
      axisBorder: { color: "#e2e8f0" },
      axisTicks: { color: "#e2e8f0" },
    },
    yaxis: {
      labels: { style: { colors: "#64748b", fontWeight: 500 } },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontWeight: 600,
      labels: { colors: "#10354a" },
      markers: { radius: 12 },
    },
    tooltip: {
      theme: "light",
      style: { fontSize: "13px" },
      y: { formatter: (val) => `${val} users` },
    },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 5 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: colors,
      strokeWidth: 2,
      hover: { size: 6 },
    },
    colors,
  };

  const series = [
    { name: "Investors", data: data.investors },
    { name: "Founders", data: data.founders },
  ];

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl bg-white
        border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-500
        hover:-translate-y-[3px]
      "
    >
      {/* Header */}
      <div className="p-5 pb-0 flex items-center justify-between">
        <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
          User Growth
        </h5>
      </div>

      {/* Chart */}
      <div className="p-2 pr-4">
        <Chart options={options} series={series} type="area" height={260} />
      </div>

    </div>
  );
}
