import React from "react";
import Chart from "react-apexcharts";

export default function ReviewTimeChart({ data }) {
  const avg = (
    data.avgDays.reduce((a, b) => a + b, 0) / data.avgDays.length
  ).toFixed(1);

  const options = {
    chart: { toolbar: { show: false }, background: "transparent" },
    xaxis: {
      categories: data.labels,
      labels: { style: { colors: "#10354a", fontWeight: 500 } },
      axisTicks: { color: "#e5e7eb" },
      axisBorder: { color: "#e5e7eb" },
    },
    yaxis: {
      labels: { style: { colors: "#10354a", fontWeight: 500 } },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
        distributed: false,
        dataLabels: {
          position: "center", // ✅ label inside the bar
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}d`,
      style: {
        colors: ["#ffffff"], // ✅ white text inside the bar
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    tooltip: {
      theme: "light",
      y: { formatter: (v) => `${v} days` },
    },
    colors: ["#22c55e"],
    grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
  };

  const series = [{ name: "Avg Review Time", data: data.avgDays }];

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl 
        border border-slate-200/70
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        hover:-translate-y-[2px]
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start p-5 pb-0">
        <div>
          <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
            Avg Review Time
          </h5>
          <p className="text-xs text-slate-500 mt-0.5">By project stage</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-emerald-600">{avg}d</p>
          <p className="text-xs text-slate-500">Overall Avg</p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-5">
        <Chart options={options} series={series} type="bar" height={230} />
      </div>
    </div>
  );
}
