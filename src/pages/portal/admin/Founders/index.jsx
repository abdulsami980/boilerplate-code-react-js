"use client";
import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import { PATH } from "@/config";
import { swalWrapper } from "@/lib/utils";
import {
  Ban,
  Building2,
  Briefcase,
  Globe,
  Eye,
  Pencil,
  Trash2,
  Users,
  Link2,
  FileText,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Founders() {
  const navigate = useNavigate();
  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: () => navigate(PATH.ADMIN.EDIT_FOUNDER),
    },
    {
      label: "Edit Profile",
      icon: Pencil,
      color: "emerald",
      onClick: () => navigate(PATH.ADMIN.EDIT_FOUNDER),
    },
    {
      label: "Delete Founder",
      icon: Trash2,
      color: "red",
      onClick: (r) => {
        swalWrapper({
          message: `Do you really want to delete ${r.company_name}?`,
          confirmButtonText: "Yes, Delete",
          cancelButtonText: "Cancel",
          accept: () => toast.error(`Deleted ${r.company_name}`),
        });
      },
    },
    {
      label: "Suspend Account",
      icon: Ban,
      color: "amber",
      onClick: (r) => {
        swalWrapper({
          message: `Are you sure you want to suspend ${r.company_name}?`,
          confirmButtonText: "Yes, Suspend",
          cancelButtonText: "Cancel",
          accept: () => toast.warning(`Suspended ${r.company_name}`),
        });
      },
    },
  ];

  // ─── Top Cards ─────────────────────────────────────────────
  const cards = [
    {
      title: "Founders",
      value: 42,
      meta: "3 pending",
      icon: <Briefcase size={22} />,
      gradient: "from-emerald-100/40 to-green-200/40",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-emerald-400/20 to-green-400/10",
    },
    {
      title: "Startups",
      value: 28,
      meta: "5 new this week",
      icon: <Building2 size={22} />,
      gradient: "from-green-100/40 to-emerald-200/40",
      ring: "ring-green-300/50",
      text: "text-green-600",
      glow: "from-green-400/20 to-emerald-400/10",
    },
    {
      title: "Documents",
      value: 76,
      meta: "KYC verified",
      icon: <FileCheck2 size={22} />,
      gradient: "from-emerald-100/40 to-green-100/30",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-green-400/20 to-emerald-400/10",
    },
    {
      title: "Team Members",
      value: 210,
      meta: "across all startups",
      icon: <Users size={22} />,
      gradient: "from-green-100/40 to-emerald-200/40",
      ring: "ring-emerald-300/50",
      text: "text-emerald-600",
      glow: "from-emerald-400/20 to-green-400/10",
    },
  ];

  // ─── Table Columns ─────────────────────────────────────────
  const columns = [
    {
      header: "Company Name",
      accessor: "company_name",
      icon: Building2,
      size: "200px",
    },
    {
      header: "Reg. Number",
      accessor: "company_registration_number",
      icon: FileText,
      size: "200px",
    },
    { header: "Website", accessor: "website_url", icon: Globe, size: "180px" },
    {
      header: "LinkedIn",
      accessor: "linkedin_url",
      icon: Link2,
      size: "180px",
    },
    {
      header: "Team Members",
      accessor: "team_members_count",
      icon: Users,
      size: "180px",
      render: (row) => `${row.team_members_count || 0}`,
    },
    {
      header: "KYC Documents",
      accessor: "kyc_front_url",
      icon: FileCheck2,
      size: "180px",
      render: (row) => (
        <a
          href={row.kyc_front_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          View KYC
        </a>
      ),
    },
    {
      header: "Terms Consent",
      accessor: "consent_terms",
      icon: ShieldCheck,
      size: "180px",
      render: (row) => (row.consent_terms ? "✔️ Yes" : "❌ No"),
    },
    {
      header: "Data Consent",
      accessor: "consent_data_usage",
      icon: ShieldCheck,
      size: "180px",
      render: (row) => (row.consent_data_usage ? "✔️ Yes" : "❌ No"),
    },
  ];
  // ─── Dummy Data ─────────────────────────────────────────────
  const data = [
    {
      company_name: "TechNova Solutions",
      company_registration_number: "TN-4523",
      website_url: "https://technova.io",
      linkedin_url: "https://linkedin.com/company/technova",
      team_members_count: 12,
      kyc_front_url: "https://example.com/kyc/front1.png",
      consent_terms: true,
      consent_data_usage: true,
    },
    {
      company_name: "Healthify Labs",
      company_registration_number: "HL-9231",
      website_url: "https://healthify.com",
      linkedin_url: "https://linkedin.com/company/healthify",
      team_members_count: 8,
      kyc_front_url: null,
      consent_terms: false,
      consent_data_usage: true,
    },
    {
      company_name: "EcoBuild Ventures",
      company_registration_number: "EB-7782",
      website_url: "https://ecobuild.org",
      linkedin_url: "https://linkedin.com/company/ecobuild",
      team_members_count: 15,
      kyc_front_url: "https://example.com/kyc/front3.png",
      consent_terms: true,
      consent_data_usage: false,
    },
    {
      company_name: "NextWave Analytics",
      company_registration_number: "NW-6610",
      website_url: "https://nextwave.ai",
      linkedin_url: "https://linkedin.com/company/nextwave",
      team_members_count: 20,
      kyc_front_url: "https://example.com/kyc/front4.png",
      consent_terms: true,
      consent_data_usage: true,
    },
    {
      company_name: "FinTrust Capital",
      company_registration_number: "FT-8890",
      website_url: "https://fintrust.com",
      linkedin_url: "https://linkedin.com/company/fintrust",
      team_members_count: 10,
      kyc_front_url: null,
      consent_terms: false,
      consent_data_usage: false,
    },
    {
      company_name: "BluePeak Industries",
      company_registration_number: "BP-1109",
      website_url: "https://bluepeak.co",
      linkedin_url: "https://linkedin.com/company/bluepeak",
      team_members_count: 25,
      kyc_front_url: "https://example.com/kyc/front6.png",
      consent_terms: true,
      consent_data_usage: true,
    },
    {
      company_name: "UrbanEdge Designs",
      company_registration_number: "UE-3742",
      website_url: "https://urbanedge.design",
      linkedin_url: "",
      team_members_count: 6,
      kyc_front_url: null,
      consent_terms: true,
      consent_data_usage: false,
    },
    {
      company_name: "SolarNet Energy",
      company_registration_number: "SN-5321",
      website_url: "https://solarnet.io",
      linkedin_url: "https://linkedin.com/company/solarnet",
      team_members_count: 18,
      kyc_front_url: "https://example.com/kyc/front8.png",
      consent_terms: true,
      consent_data_usage: true,
    },
    {
      company_name: "AgriVerse Technologies",
      company_registration_number: "AV-9982",
      website_url: "https://agriverse.com",
      linkedin_url: "https://linkedin.com/company/agriverse",
      team_members_count: 9,
      kyc_front_url: null,
      consent_terms: false,
      consent_data_usage: true,
    },
    {
      company_name: "Medora Health Systems",
      company_registration_number: "MH-4570",
      website_url: "https://medorahealth.org",
      linkedin_url: "https://linkedin.com/company/medorahealth",
      team_members_count: 14,
      kyc_front_url: "https://example.com/kyc/front10.png",
      consent_terms: true,
      consent_data_usage: false,
    },
    {
      company_name: "GreenPath Logistics",
      company_registration_number: "GP-2391",
      website_url: "https://greenpathlogistics.com",
      linkedin_url: "https://linkedin.com/company/greenpath",
      team_members_count: 30,
      kyc_front_url: "https://example.com/kyc/front11.png",
      consent_terms: true,
      consent_data_usage: true,
    },
    {
      company_name: "DataSphere Analytics",
      company_registration_number: "DS-8812",
      website_url: "https://datasphere.ai",
      linkedin_url: "",
      team_members_count: 7,
      kyc_front_url: null,
      consent_terms: false,
      consent_data_usage: false,
    },
    {
      company_name: "AeroLink Aviation",
      company_registration_number: "AL-7005",
      website_url: "https://aerolink.io",
      linkedin_url: "https://linkedin.com/company/aerolink",
      team_members_count: 22,
      kyc_front_url: "https://example.com/kyc/front13.png",
      consent_terms: true,
      consent_data_usage: true,
    },
  ];

  // ─── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Top cards */}
      <TopCards cards={cards} />

      {/* Founders Table */}
      <ToolBar
        title="Registered Founders"
        subtitle="Manage all founder profiles and startup data here."
        showSearch={true}
        onSearch={(query) => console.log("Searching:", query)}
      >
        <Table columns={columns} data={data} actions={actions} pageSize={4} />
      </ToolBar>
    </div>
  );
}
