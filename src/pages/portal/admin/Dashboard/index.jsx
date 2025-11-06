// src/pages/portal/Dashboard.jsx
import { Button } from "@/components/ui/button";
import TopCards from "@/components/ui/topCards";
import { Box, Briefcase, Download, LifeBuoy, Users } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import ApprovalRateGauge from "./Components/ApprovalRateGauge";
import IdeasBySectorChart from "./Components/IdeasBySectorChart";
import RecentActivity from "./Components/RecentActivity";
import ReviewTimeChart from "./Components/ReviewTimeChart";
import ShortlistTrendChart from "./Components/ShortlistTrendChart";
import TicketVolumeChart from "./Components/TicketVolumeChart";
import UserGrowthChart from "./Components/UserGrowthChart";

const cards = [
  {
    title: "Investors",
    value: 120,
    meta: "5 pending",
    icon: <Users size={22} />,
  },
  {
    title: "Founders",
    value: 42,
    meta: "2 pending",
    icon: <Briefcase size={22} />,
  },
  {
    title: "Business Proposals",
    value: 78,
    meta: "10 under review",
    icon: <Box size={22} />,
  },
  {
    title: "Tickets",
    value: 14,
    meta: "3 open",
    icon: <LifeBuoy size={22} />,
  },
];

const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const userGrowth = {
  labels,
  investors: [120, 150, 200, 170, 190, 210, 230],
  founders: [80, 90, 110, 100, 120, 140, 150],
};

const ideasBySector = [
  { sector: "Technology", count: 320 },
  { sector: "Healthcare", count: 140 },
  { sector: "FinTech", count: 95 },
  { sector: "Agriculture", count: 70 },
  { sector: "Education", count: 48 },
  { sector: "Energy", count: 35 },
];

const shortlistTrend = { labels, counts: [12, 18, 30, 28, 40, 55, 60] };

const ticketVolume = {
  labels,
  open: [12, 9, 15, 10, 17, 14, 23],
  resolved: [8, 6, 10, 9, 12, 11, 20],
  escalated: [1, 0, 1, 2, 0, 1, 3],
};

const approvalRate = { value: 78 };
const reviewTime = {
  labels: ["Prototype", "MVP", "Growth", "Scaling"],
  avgDays: [6.2, 4.8, 9.1, 12.4],
};

const recentEvents = [
  { text: "Approved idea: Solar Irrigation (Founder: Aisha)", time: "2h" },
  { text: "Investor verified: Omar Khan", time: "6h" },
  { text: "Flagged idea: Unknown Startup — under review", time: "1d" },
  { text: "New ticket: KYC upload error", time: "1d" },
];

export default function Dashboard() {
  const handleExport = () => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // 1️⃣ KPI Cards
      const cardsSheet = XLSX.utils.json_to_sheet(
        cards.map((c) => ({
          Title: c.title,
          Value: c.value,
          Meta: c.meta,
        }))
      );
      XLSX.utils.book_append_sheet(wb, cardsSheet, "KPIs");

      // 2️⃣ User Growth
      const userGrowthSheet = XLSX.utils.json_to_sheet(
        userGrowth.labels.map((label, i) => ({
          Month: label,
          Investors: userGrowth.investors[i],
          Founders: userGrowth.founders[i],
        }))
      );
      XLSX.utils.book_append_sheet(wb, userGrowthSheet, "User Growth");

      // 3️⃣ Ideas by Sector
      const ideasSheet = XLSX.utils.json_to_sheet(
        ideasBySector.map((i) => ({
          Sector: i.sector,
          Ideas: i.count,
        }))
      );
      XLSX.utils.book_append_sheet(wb, ideasSheet, "Ideas by Sector");

      // 4️⃣ Shortlist Trend
      const shortlistSheet = XLSX.utils.json_to_sheet(
        shortlistTrend.labels.map((label, i) => ({
          Month: label,
          Count: shortlistTrend.counts[i],
        }))
      );
      XLSX.utils.book_append_sheet(wb, shortlistSheet, "Shortlist Trend");

      // 5️⃣ Ticket Volume
      const ticketSheet = XLSX.utils.json_to_sheet(
        ticketVolume.labels.map((label, i) => ({
          Month: label,
          Open: ticketVolume.open[i],
          Resolved: ticketVolume.resolved[i],
          Escalated: ticketVolume.escalated[i],
        }))
      );
      XLSX.utils.book_append_sheet(wb, ticketSheet, "Ticket Volume");

      // 6️⃣ Approval Rate
      const approvalSheet = XLSX.utils.json_to_sheet([
        { Metric: "Approval Rate (%)", Value: approvalRate.value },
      ]);
      XLSX.utils.book_append_sheet(wb, approvalSheet, "Approval Rate");

      // 7️⃣ Review Time
      const reviewSheet = XLSX.utils.json_to_sheet(
        reviewTime.labels.map((label, i) => ({
          Stage: label,
          "Average Days": reviewTime.avgDays[i],
        }))
      );
      XLSX.utils.book_append_sheet(wb, reviewSheet, "Review Time");

      // 8️⃣ Recent Activity
      const activitySheet = XLSX.utils.json_to_sheet(
        recentEvents.map((e) => ({
          Event: e.text,
          Time: e.time,
        }))
      );
      XLSX.utils.book_append_sheet(wb, activitySheet, "Recent Activity");

      // 9️⃣ Save file
      XLSX.writeFile(wb, "SuperAdminDashboardData.xlsx");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export data.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#10354a]">
              Super Admin Dashboard
            </h1>
            <p className="text-sm text-[#4b5563]">
              Real-time analytics and platform overview
            </p>
          </div>

          <Button className="w-full sm:w-auto" onClick={handleExport}>
            <Download size={16} />
            Export
          </Button>
        </div>
        {/* KPIs */}
        <TopCards cards={cards} />
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserGrowthChart data={userGrowth} />
          <IdeasBySectorChart data={ideasBySector} />

          <ShortlistTrendChart data={shortlistTrend} />
          <TicketVolumeChart data={ticketVolume} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ApprovalRateGauge value={approvalRate.value} />
          <ReviewTimeChart data={reviewTime} />
          <RecentActivity items={recentEvents} />
        </div>
      </div>
    </div>
  );
}
