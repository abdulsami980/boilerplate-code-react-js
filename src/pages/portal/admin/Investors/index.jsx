import InlineLoader, { PageLoader } from "@/components/ui/Loaders";
import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import { PATH } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase-client";
import { swalWrapper } from "@/lib/utils";
import {
  Ban,
  Box,
  Briefcase,
  Eye,
  LifeBuoy,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  Users,
  CheckCircle,
  AlertCircle,
  Shield,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Investors() {
  const navigate = useNavigate();

  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 600); 

  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: (r) => navigate(PATH.ADMIN.VIEW_INVESTOR.TO(r.id)),
    },
    {
      label: "Edit Profile",
      icon: Pencil,
      color: "green",
      onClick: (r) => navigate(PATH.ADMIN.EDIT_INVESTOR.TO(r.id)),
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

            // ✅ Instantly update UI
            setInvestors((prev) =>
              prev.map((inv) =>
                inv.id === r.id ? { ...inv, is_active: newStatus } : inv
              )
            );

            toast.success(
              r.is_active
                ? `${r.full_name} has been suspended`
                : `${r.full_name} has been reactivated`
            );
          },
        });
      },
    },
    {
      label: "Delete Investor",
      icon: Trash2,
      color: "red",
      onClick: (r) => {
        swalWrapper({
          message: `Do you really want to delete ${r.full_name}?`,
          confirmButtonText: "Yes, Delete",
          cancelButtonText: "Cancel",
          accept: async () => {
            try {
              // 🔥 Update soft delete status
              const { error } = await supabase
                .from("profiles")
                .update({ is_deleted: true })
                .eq("id", r.id);

              if (error) {
                console.error(error);
                toast.error("Failed to delete investor");
                return;
              }

              // 🔥 Instantly remove from UI
              setInvestors((prev) => prev.filter((inv) => inv.id !== r.id));

              toast.success(`${r.full_name} has been deleted successfully`);
            } catch (err) {
              console.error("Unexpected error deleting investor:", err);
              toast.error("Something went wrong");
            }
          },
        });
      },
    },
  ];

  const columns = [
    { header: "Name", accessor: "full_name", icon: Users, size: "140px" },
    { header: "Email", accessor: "email", icon: Mail, size: "190px" },
    { header: "Phone", accessor: "phone", icon: Phone, size: "170px" },
    { header: "Country", accessor: "country", icon: MapPin, size: "140px" },
    {
      header: "Company",
      accessor: "companyName",
      icon: Briefcase,
      size: "180px",
    },
    {
      header: "Occupation",
      accessor: "occupation",
      icon: Users,
      size: "160px",
    },
    {
      header: "Investment Exp.",
      accessor: "investmentExperienceYears",
      icon: Clock,
      size: "200px",
    },
    {
      header: "Preferred Stage",
      accessor: "businessStage",
      icon: Box,
      size: "200px",
    },
    {
      header: "Account Status",
      accessor: "is_active",
      icon: ShieldCheck,
      size: "200px",
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
            <AlertCircle size={16} className="mr-2 text-amber-500" /> Require
            Verification
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
  ];

  const fetchInvestors = async (searchText = "") => {
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
        setInvestors([]);
        setLoading(false);
        setSearchLoading(false);
        return;
      }

      const { data: investorList, error: investorError } = await supabase
        .from("investors")
        .select("*")
        .in("profile_id", profileIds);

      if (investorError) throw investorError;

      const formatted = investorList
        .map((inv) => {
          const profile = profileList.find((p) => p.id === inv.profile_id);
          if (!profile) return null;

          return {
            id: profile.id,
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone,
            country: profile.country,
            occupation: profile.occupation,
            companyName: inv.company_name,
            kyc_status: profile.kyc_status,
            is_active: profile.is_active,
            is_verified: profile.is_verified,
            investmentExperienceYears: inv.investment_experience_years,
            businessStage: inv.investment_stage,
            businessModel: inv.business_model,
            preferredCurrency: inv.preferred_currency,
            involvementLevel: inv.involvement_level,
            taxNumber: inv.tax_number,
          };
        })
        .filter(Boolean);

      setInvestors(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching investors");
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const total = investors.length;
  const active = investors.filter((i) => i.is_active).length;
  const verified = investors.filter((i) => i.is_verified).length;
  const pendingKyc = investors.filter((i) => i.kyc_status === "pending").length;

  const cards = [
    {
      title: "Total Investors",
      value: total,
      meta: `${active} active`,
      icon: <Users size={22} />,
    },
    {
      title: "Active Investors",
      value: active,
      meta: `${total - active} inactive`,
      icon: <CheckCircle size={22} />,
    },
    {
      title: "Verified Investors",
      value: verified,
      meta: `${total - verified} pending`,
      icon: <Shield size={22} />,
    },
    {
      title: "Pending KYC",
      value: pendingKyc,
      meta: `${total - pendingKyc} verified`,
      icon: <Clock size={22} />,
    },
  ];

  useEffect(() => {
    fetchInvestors(debouncedSearch);
  }, [debouncedSearch]);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8">
      <TopCards cards={cards} />

      <ToolBar
        title="Registered Investors"
        subtitle="Manage all investors and their investments here."
        showSearch={true}
        onSearch={(query) => setSearchQuery(query)}
      >
        {searchLoading ? (
          <InlineLoader text="Fetching investors..." />
        ) : (
          <Table
            columns={columns}
            data={investors}
            actions={actions}
            pageSize={10}
          />
        )}
      </ToolBar>
    </div>
  );
}
