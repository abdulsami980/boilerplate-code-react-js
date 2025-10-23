import React from "react";
import Chart from "react-apexcharts";

export default function IdeasBySectorChart({ data }) {
  const labels = data.map((d) => d.sector);
  const series = data.map((d) => d.count);

  const options = {
    chart: { toolbar: { show: false } },
    labels,
    colors: ["#22c55e", "#16a34a", "#15803d", "#4ade80", "#10354a", "#0d2437"],
    legend: { position: "bottom", labels: { colors: "#10354a" } },
    tooltip: { shared: false, intersect: true },
    plotOptions: { pie: { donut: { size: "60%" } } },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
        Ideas by Sector
      </h5>

      <Chart options={options} series={series} type="donut" height={260} />
    </div>
  );
}
