import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/Loaders";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditFounder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isViewMode = location.pathname.includes("/view/");

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    is_verified: false,
    is_active: false,
    kyc_status: "",
    company_name: "",
    profile_photo_url: "",
    company_registration_number: "",
    website_url: "",
    linkedin_url: "",
    team_members_count: 0,
    kyc_front_url: "",
    kyc_back_url: "",
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        setLoading(true);

        // Fetch profile data
        const { data: profile, error: profileErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (profileErr || !profile) {
          toast.error("Profile not found");
          navigate(PATH.ADMIN.FOUNDERS);
          return;
        }

        // Fetch founder data
        const { data: founder, error: founderErr } = await supabase
          .from("founders")
          .select("*")
          .eq("profile_id", profile.id)
          .maybeSingle();

        if (founderErr && founderErr.code !== "PGRST116") {
          throw founderErr;
        }

        // Merge both objects
        setForm({
          id: profile.id || "",
          full_name: profile.full_name || "",
          profile_photo_url: profile?.profile_photo_url || "",
          email: profile.email || "",
          phone: profile.phone || "",
          country: profile.country || "",
          city: profile.city || "",
          is_verified: profile.is_verified || false,
          is_active: profile.is_active || false,
          kyc_status: profile.kyc_status || "",
          company_name: founder?.company_name || "",
          company_registration_number:
            founder?.company_registration_number || "",
          website_url: founder?.website_url || "",
          linkedin_url: founder?.linkedin_url || "",
          team_members_count: founder?.team_members_count || 0,
          kyc_front_url: founder?.kyc_front_url || "",
          kyc_back_url: founder?.kyc_back_url || "",
        });
      } catch (err) {
        console.error("Error fetching founder data:", err);
        toast.error("Failed to fetch founder data");
      } finally {
        setLoading(false);
      }
    };

    fetchFounder();
  }, [id, navigate]);

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);

    try {
      const profileUpdate = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        is_verified: form.is_verified,
        is_active: form.is_active,
        kyc_status: form.kyc_status,
      };

      const founderUpdate = {
        company_name: form.company_name,
        company_registration_number: form.company_registration_number,
        website_url: form.website_url,
        linkedin_url: form.linkedin_url,
        team_members_count: form.team_members_count,
        kyc_front_url: form.kyc_front_url,
        kyc_back_url: form.kyc_back_url,
      };

      // Parallel updates (profile + founder)
      const [
        { error: profileError },
        { data: existingFounder, error: fetchError },
      ] = await Promise.all([
        supabase.from("profiles").update(profileUpdate).eq("id", form.id),
        supabase
          .from("founders")
          .select("id")
          .eq("profile_id", form.id)
          .maybeSingle(),
      ]);

      if (profileError) throw profileError;
      if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

      if (existingFounder) {
        // Update if exists
        const { error: founderError } = await supabase
          .from("founders")
          .update(founderUpdate)
          .eq("profile_id", form.id);
        if (founderError) throw founderError;
      } else {
        // Insert if not exists
        const { error: insertError } = await supabase
          .from("founders")
          .insert([{ profile_id: form.id, ...founderUpdate }]);
        if (insertError) throw insertError;
      }

      toast.success("Founder updated successfully!");
      navigate(PATH.ADMIN.FOUNDERS);
    } catch (err) {
      console.error("Error saving founder:", err);
      toast.error("Failed to update founder");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl text-[#10354a] font-semibold">
            {!isViewMode ? "Edit Founder" : "View Founder"}
          </h1>
          <p className="text-sm text-slate-600">
            {!isViewMode
              ? "Update founder profile and preferences"
              : "View founder profile and preferences"}
          </p>
        </div>
        {!isViewMode && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate(PATH.ADMIN.FOUNDERS)}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              isLoading={isSubmitting}
              loadingText="Saving Founder Info..."
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile & Attachments */}
        <aside className="space-y-6 lg:col-span-1 order-1">
          <div className="w-full bg-white rounded-xl shadow border border-slate-200 p-4 space-y-6">
            {/* Profile Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={form.profile_photo_url || IMAGES.PLACEHOLDER_MAN}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Personal Info */}
            <section className="space-y-2 text-sm">
              <h3 className="font-semibold text-green-700">Personal Info:</h3>
              <div className="mt-1 space-y-1 text-slate-600">
                <p>
                  <span className="font-medium">Name:</span> {form.full_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {form.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {form.phone}
                </p>
              </div>
            </section>
            <hr className="border-slate-200" />

            {/* Company Info */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                Company Info:
              </h3>
              <div className="mt-1 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {form.company_name}
                </p>
                <p>
                  <span className="font-medium">Reg #:</span>{" "}
                  {form.company_registration_number}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  {form.website_url}
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  {form.linkedin_url}
                </p>
                <p>
                  <span className="font-medium">Team Members:</span>{" "}
                  {form.team_members_count}
                </p>
              </div>
            </section>
            <hr className="border-slate-200" />

            {/* KYC Documents */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                KYC Documents:
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                {form.kyc_front_url && (
                  <li>
                    <a
                      href={form.kyc_front_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View Front
                    </a>
                  </li>
                )}
                {form.kyc_back_url && (
                  <li>
                    <a
                      href={form.kyc_back_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View Back
                    </a>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </aside>

        {/* Right: Form */}
        <div className="lg:col-span-2 space-y-6 order-2">
          {/* Personal & Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal & Contact</CardTitle>
              <CardDescription>Founder profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  disabled
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  disabled
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  disabled
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Input
                  label="Country"
                  placeholder="Enter country"
                  disabled
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
                <Input
                  label="City"
                  placeholder="Enter city"
                  disabled
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-sm text-slate-700 font-medium">
                    KYC Status:
                  </span>

                  <Checkbox
                    label="Verified"
                    disabled={isViewMode}
                    checked={form.kyc_status === "approved"}
                    onCheckedChange={(val) =>
                      handleChange("kyc_status", val ? "approved" : "pending")
                    }
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-sm text-slate-700 font-medium">
                    Account Verified:
                  </span>

                  <Checkbox
                    label="Verified"
                    disabled={isViewMode}
                    checked={form.is_verified}
                    onCheckedChange={(val) =>
                      handleChange("is_verified", val === true)
                    }
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-sm text-slate-700 font-medium">
                    Account Status:
                  </span>

                  <Checkbox
                    label="Active"
                    disabled={isViewMode}
                    checked={form.is_active}
                    onCheckedChange={(val) =>
                      handleChange("is_active", val === true)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Company & Compliance</CardTitle>
              <CardDescription>
                Details of the founder's company and consents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  disabled={isViewMode}
                  placeholder="Enter company name"
                  value={form.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <Input
                  label="Registration Number"
                  disabled={isViewMode}
                  placeholder="Enter registration number"
                  value={form.company_registration_number}
                  onChange={(e) =>
                    handleChange("company_registration_number", e.target.value)
                  }
                />
                <Input
                  label="Website"
                  placeholder="Enter website URL"
                  disabled={isViewMode}
                  value={form.website_url}
                  onChange={(e) => handleChange("website_url", e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  placeholder="Enter LinkedIn URL"
                  disabled={isViewMode}
                  value={form.linkedin_url}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                />
                <Input
                  label="Team Members Count"
                  type="number"
                  placeholder="Enter number of team members"
                  disabled={isViewMode}
                  value={form.team_members_count}
                  onChange={(e) =>
                    handleChange("team_members_count", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
