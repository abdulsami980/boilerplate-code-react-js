import React from "react";
import Chart from "react-apexcharts";

export default function TicketVolumeChart({ data }) {
  const options = {
    chart: { stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "55%", borderRadius: 4 } },
    xaxis: { categories: data.labels },
    yaxis: { labels: { style: { colors: "#10354a" } } },
    legend: { position: "top", labels: { colors: "#10354a" } },
    tooltip: { shared: true, intersect: false },
    colors: ["#22c55e", "#16a34a", "#15803d"],
    grid: { borderColor: "#e5e7eb" },
  };

  const series = [
    { name: "Open", data: data.open },
    { name: "Resolved", data: data.resolved },
    { name: "Escalated", data: data.escalated },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h5 className="text-sm font-semibold text-[#10354a] tracking-wide flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
        Ticket Volume
      </h5>

      <Chart options={options} series={series} type="bar" height={220} />
    </div>
  );
}
