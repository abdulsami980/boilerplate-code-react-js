import InlineLoader, { PageLoader } from "@/components/ui/Loaders";
import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import { PATH } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase-client";
import { swalWrapper } from "@/lib/utils";
import {
  AlertCircle,
  Ban,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  Eye,
  Globe,
  Link,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Founders() {
  const navigate = useNavigate();

  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 600);

  // 🎯 Actions
  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: (r) => navigate(PATH.ADMIN.VIEW_FOUNDER.TO(r.id)),
    },
    {
      label: "Edit Profile",
      icon: Pencil,
      color: "green",
      onClick: (r) => navigate(PATH.ADMIN.EDIT_FOUNDER.TO(r.id)),
    },
    {
      label: (r) => (r.is_active ? "Suspend Account" : "Reactivate Account"),
      icon: (r) => (r.is_active ? Ban : CheckCircle),
      color: "amber",
      onClick: (r) => {
        const actionType = r.is_active ? "suspend" : "reactivate";
        const confirmText = r.is_active ? "Yes, Suspend" : "Yes, Reactivate";
        const message = r.is_active
          ? `Are you sure you want to suspend ${r.full_name}?`
          : `Do you want to reactivate ${r.full_name}'s account?`;

        swalWrapper({
          message,
          confirmButtonText: confirmText,
          cancelButtonText: "Cancel",
          accept: async () => {
            const newStatus = !r.is_active;
            const { error } = await supabase
              .from("profiles")
              .update({ is_active: newStatus })
              .eq("id", r.id);

            if (error) {
              toast.error(`Failed to ${actionType} account`);
              console.error(error);
              return;
            }

            setFounders((prev) =>
              prev.map((f) =>
                f.id === r.id ? { ...f, is_active: newStatus } : f
              )
            );

            toast.success(
              r.is_active
                ? "Founder has been suspended successfully"
                : "Founder has been reactivated successfully"
            );
          },
        });
      },
    },
    {
      label: "Delete Founder",
      icon: Trash2,
      color: "red",
      onClick: (r) => {
        swalWrapper({
          message: `Do you really want to delete ${r.full_name}?`,
          confirmButtonText: "Yes, Delete",
          cancelButtonText: "Cancel",
          accept: async () => {
            try {
              const { error } = await supabase
                .from("profiles")
                .update({ is_deleted: true })
                .eq("id", r.id);

              if (error) {
                console.error(error);
                toast.error("Failed to delete founder");
                return;
              }

              setFounders((prev) => prev.filter((f) => f.id !== r.id));
              toast.success("Founder has been deleted successfully");
            } catch (err) {
              console.error("Unexpected error deleting founder:", err);
              toast.error("Something went wrong");
            }
          },
        });
      },
    },
  ];

  // ─── Table Columns ─────────────────────────────────────────
  const columns = [
    { header: "Name", accessor: "full_name", icon: Users, size: "150px" },
    { header: "Email", accessor: "email", icon: Mail, size: "190px" },
    { header: "Phone", accessor: "phone", icon: Phone, size: "170px" },
    {
      header: "Account Status",
      accessor: "is_active",
      icon: ShieldCheck,
      size: "220px",
      render: (row) =>
        row.is_active ? (
          <span className="flex items-center text-emerald-600 font-medium">
            <CheckCircle size={16} className="mr-2 text-emerald-500" /> Active
          </span>
        ) : (
          <span className="flex items-center text-amber-500 font-medium">
            <AlertCircle size={16} className="mr-2 text-amber-500" /> Suspended
          </span>
        ),
    },
    {
      header: "Verification Status",
      accessor: "is_verified",
      icon: ShieldCheck,
      size: "220px",
      render: (row) =>
        row.is_verified ? (
          <span className="flex items-center text-emerald-600 font-medium">
            <CheckCircle size={16} className="mr-2 text-emerald-500" /> Verified
          </span>
        ) : (
          <span className="flex items-center text-amber-500 font-medium">
            <AlertCircle size={16} className="mr-2 text-amber-500" /> Not
            Verified
          </span>
        ),
    },
    {
      header: "KYC Status",
      accessor: "kyc_status",
      icon: ShieldCheck,
      size: "220px",
      render: (row) =>
        row.kyc_status === "approved" ? (
          <span className="flex items-center text-emerald-600 font-medium">
            <CheckCircle size={16} className="mr-2 text-emerald-500" /> Verified
          </span>
        ) : (
          <span className="flex items-center text-amber-500 font-medium">
            <AlertCircle size={16} className="mr-2 text-amber-500" /> Require
            Verification
          </span>
        ),
    },
    { header: "Country", accessor: "country", icon: MapPin, size: "140px" },
    {
      header: "Company",
      accessor: "company_name",
      icon: Building2,
      size: "200px",
    },
    {
      header: "Team Members",
      accessor: "team_members_count",
      icon: Users,
      size: "180px",
    },
    {
      header: "Website",
      accessor: "website_url",
      icon: Globe,
      size: "200px",
      render: (row) =>
        row.website_url ? (
          <a
            href={row.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-emerald-600 hover:underline"
          >
            <Link size={16} className="mr-2 text-emerald-500" />
            View Website
          </a>
        ) : (
          "—"
        ),
    },
    {
      header: "LinkedIn",
      accessor: "linkedin_url",
      icon: Briefcase,
      size: "200px",
      render: (row) =>
        row.linkedin_url ? (
          <a
            href={row.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-emerald-600 hover:underline"
          >
            <Link size={16} className="mr-2 text-emerald-500" />
            View Profile
          </a>
        ) : (
          "—"
        ),
    },
  ];

  const fetchFounders = async (searchText = "") => {
    if (searchText.trim()) setSearchLoading(true);
    else setLoading(true);

    try {
      let profileQuery = supabase
        .from("profiles")
        .select("*")
        .eq("is_deleted", false);

      if (searchText.trim()) {
        profileQuery = profileQuery.or(
          `full_name.ilike.%${searchText}%,email.ilike.%${searchText}%`
        );
      }

      const { data: profileList, error: profileError } = await profileQuery;
      if (profileError) throw profileError;

      const profileIds = profileList.map((p) => p.id);
      if (!profileIds.length) {
        setFounders([]);
        setLoading(false);
        setSearchLoading(false);
        return;
      }

      const { data: founderList, error: founderError } = await supabase
        .from("founders")
        .select("*")
        .in("profile_id", profileIds);

      if (founderError) throw founderError;

      const formatted = founderList
        .map((f) => {
          const profile = profileList.find((p) => p.id === f.profile_id);
          if (!profile) return null;
          return {
            id: profile.id,
            full_name: profile.full_name || "N/A",
            email: profile.email || "N/A",
            phone: profile.phone || "N/A",
            country: profile.country || "N/A",
            company_name: f.company_name || "N/A",
            team_members_count: f.team_members_count || 0,
            website_url: f.website_url || "",
            linkedin_url: f.linkedin_url || "",
            kyc_status: profile.kyc_status || "pending",
            is_active: profile.is_active ?? true,
            is_verified: profile.is_verified ?? false,
          };
        })
        .filter(Boolean);

      setFounders(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching founders");
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  // 📈 Stats Cards
  const total = founders.length;
  const active = founders.filter((f) => f.is_active).length;
  const verified = founders.filter((f) => f.is_verified).length;
  const pendingKyc = founders.filter((f) => f.kyc_status === "pending").length;

  const cards = [
    {
      title: "Total Founders",
      value: total,
      meta: `${active} active`,
      icon: <Users size={22} />,
    },
    {
      title: "Active Founders",
      value: active,
      meta: `${total - active} inactive`,
      icon: <CheckCircle size={22} />,
    },
    {
      title: "Verified Founders",
      value: verified,
      meta: `${total - verified} pending`,
      icon: <ShieldCheck size={22} />,
    },
    {
      title: "Pending KYC",
      value: pendingKyc,
      meta: `${total - pendingKyc} verified`,
      icon: <Clock size={22} />,
    },
  ];

  useEffect(() => {
    fetchFounders(debouncedSearch);
  }, [debouncedSearch]);

  if (loading) return <PageLoader />;

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
        onSearch={(query) => setSearchQuery(query)}
      >
        {searchLoading ? (
          <InlineLoader text="Fetching founders..." />
        ) : (
          <Table
            columns={columns}
            data={founders}
            actions={actions}
            pageSize={10}
          />
        )}
      </ToolBar>
    </div>
  );
}
