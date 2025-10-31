import React from "react";
import Chart from "react-apexcharts";

export default function ShortlistTrendChart({ data }) {
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    xaxis: {
      categories: data.labels,
      labels: { style: { colors: "#10354a", fontWeight: 500 } },
      axisBorder: { color: "#e5e7eb" },
      axisTicks: { color: "#e5e7eb" },
    },
    yaxis: {
      title: {
        text: "Shortlists",
        style: { color: "#10354a", fontWeight: 600 },
      },
      labels: { style: { colors: "#10354a", fontWeight: 500 } },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    colors: ["#16a34a"],
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val} shortlists`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#22c55e",
            opacity: 0.3,
          },
          {
            offset: 100,
            color: "#86efac",
            opacity: 0.05,
          },
        ],
      },
    },
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColors: "#16a34a",
      strokeWidth: 2,
      hover: { sizeOffset: 2 },
    },
  };

  const series = [{ name: "Shortlists", data: data.counts }];

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl bg-white
        border border-slate-200/70
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        hover:-translate-y-[3px]
        transition-all duration-500
      "
    >
      {/* Header */}
      <div className="p-5 pb-0 flex items-center ">
        <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
          Shortlist Activity
        </h5>
      </div>

      {/* Chart */}
      <div className="px-5">
        <Chart options={options} series={series} type="area" height={240} />
      </div>

    </div>
  );
}
