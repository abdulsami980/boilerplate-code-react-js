import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import { PATH } from "@/config";
import { swalWrapper } from "@/lib/utils";
import {
  Ban,
  Box,
  Briefcase,
  Eye,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Investors() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: () => navigate(PATH.ADMIN.EDIT_INVESTOR),
    },
    {
      label: "Edit Profile",
      icon: Pencil,
      color: "emerald",
      onClick: () => navigate(PATH.ADMIN.EDIT_INVESTOR),
    },
    {
      label: "Delete Investor",
      icon: Trash2,
      color: "red",
      onClick: (r) => {
        swalWrapper({
          message: `Do you really want to delete ${r.name}?`,
          confirmButtonText: "Yes, Delete",
          cancelButtonText: "Cancel",
          accept: () => toast.error(`Deleted ${r.name}`),
        });
      },
    },
    {
      label: "Suspend Account",
      icon: Ban,
      color: "amber",
      onClick: (r) => {
        swalWrapper({
          message: `Are you sure you want to suspend ${r.name}?`,
          confirmButtonText: "Yes, Suspend",
          cancelButtonText: "Cancel",
          accept: () => toast.warning(`Suspended ${r.name}`),
        });
      },
    },
  ];

  const cards = [
    {
      title: "Investors",
      value: 120,
      meta: "5 pending",
      icon: <Users size={22} />,
      gradient: "from-emerald-100/40 to-green-200/40",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-emerald-400/20 to-green-400/10",
    },
    {
      title: "Founders",
      value: 42,
      meta: "2 pending",
      icon: <Briefcase size={22} />,
      gradient: "from-green-100/40 to-emerald-200/40",
      ring: "ring-green-300/50",
      text: "text-green-600",
      glow: "from-green-400/20 to-emerald-400/10",
    },
    {
      title: "Ideas",
      value: 78,
      meta: "10 under review",
      icon: <Box size={22} />,
      gradient: "from-emerald-100/40 to-green-100/30",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-green-400/20 to-emerald-400/10",
    },
    {
      title: "Tickets",
      value: 14,
      meta: "3 open",
      icon: <LifeBuoy size={22} />,
      gradient: "from-green-100/40 to-emerald-200/40",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-emerald-400/20 to-green-400/10",
    },
  ];

  const columns = [
    { header: "Name", accessor: "full_name", icon: Users, size: "140px" }, // +20%
    { header: "Email", accessor: "email", icon: Mail, size: "190px" }, // wider for email
    { header: "Phone", accessor: "phone", icon: Phone, size: "170px" },
    { header: "Country", accessor: "country", icon: MapPin, size: "140px" },
    {
      header: "KYC Status",
      accessor: "kyc_status",
      icon: ShieldCheck,
      size: "180px",
    },
    {
      header: "Investment Range",
      accessor: "investment_range",
      icon: Box,
      size: "220px",
      render: (row) =>
        `$${row.min_investment.toLocaleString()} - $${row.max_investment.toLocaleString()}`,
    },
    {
      header: "Preferred Sectors",
      accessor: "preferred_sectors",
      icon: Box,
      size: "220px",
      render: (row) => row.preferred_sectors.join(", "),
    },
  ];

  const data = [
    {
      full_name: "Ali Khan",
      email: "ali@invest.co",
      phone: "+92 300 1234567",
      country: "Pakistan",
      kyc_status: "Verified",
      min_investment: 10000,
      max_investment: 50000,
      preferred_sectors: ["Tech", "Healthcare"],
    },
    {
      full_name: "John Smith",
      email: "john@startup.io",
      phone: "+1 555 9876543",
      country: "USA",
      kyc_status: "Pending",
      min_investment: 20000,
      max_investment: 100000,
      preferred_sectors: ["Finance", "Real Estate"],
    },
    {
      full_name: "Sara Malik",
      email: "sara@founders.co",
      phone: "+44 7700 900123",
      country: "UK",
      kyc_status: "Verified",
      min_investment: 50000,
      max_investment: 150000,
      preferred_sectors: ["Education", "Tech"],
    },
    {
      full_name: "Michael Lee",
      email: "michael@invest.co",
      phone: "+61 400 123 456",
      country: "Australia",
      kyc_status: "Verified",
      min_investment: 30000,
      max_investment: 120000,
      preferred_sectors: ["Energy", "Tech"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top cards */}
      <TopCards cards={cards} />

      {/* Dashboard section with table */}
      <ToolBar
        title="Registered Investors"
        subtitle="Manage all investors and their investments here."
        showSearch={true}
        onSearch={(query) => console.log("Searching:", query)}
      >
        <Table columns={columns} data={data} actions={actions} pageSize={4} />
      </ToolBar>
    </div>
  );
}
