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
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import { getLookupOptions, getSignedUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditFounder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    id: "",
    is_active: false,
    kyc_status: "",
    is_verified: false,
    profile_photo_url: null,
    fullName: "",
    email: "",
    mobile: "",
    nationality: "",
    residencyStatus: "",
    country: "",
    city: "",
    nationalId: "",
    occupation: "",
    years_of_experience: "",
    previous_startups_count: "",
    current_employment_status: "",
    cofounder_count: "",
    team_members_count: "",
    company_name: "",
    company_registration_number: "",
    company_website_url: "",
    company_linkedin_url: "",
    entrepreneurial_experience: "",
    team_skillset_summary: "",
    founder_vision_statement: "",
    long_term_goals: "",
    full_time_on_startup: false,
    has_tech_cofounder: false,
    equity_split_clarity: false,
    has_cap_table: false,
    verification_doc_url: null,
    id_doc_url: null,
    additional_info: "",

    profilePhotoPath: null,
    idDocumentPath: null,
    verificationDocPath: null,
  });

  const isViewMode = location.pathname.includes("/view/");

  const options = {
    employmentStatuses: getLookupOptions("employment_status"),
  };

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        setLoading(true);

        // Fetch profile data
        const { data: profileData, error: profileErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (profileErr || !profileData) {
          toast.error("Profile not found");
          navigate(PATH.ADMIN.FOUNDERS);
          return;
        }

        // Fetch founder data
        const { data: founderData, error: founderErr } = await supabase
          .from("founders")
          .select("*")
          .eq("profile_id", profileData.id)
          .maybeSingle();

        if (founderErr && founderErr.code !== "PGRST116") {
          throw founderErr;
        }

        const [
          profilePhotoSignedUrl,
          idDocumentSignedUrl,
          verificationDocSignedUrl,
        ] = await Promise.all([
          getSignedUrl("profiles", profileData?.profile_photo_url),
          getSignedUrl("profiles", profileData?.id_doc_url),
          getSignedUrl("kyc-docs", founderData?.verification_doc_url),
        ]);

        setForm({
          id: profileData?.id,
          is_active: profileData?.is_active,
          kyc_status: profileData?.kyc_status,
          is_verified: profileData?.is_verified,
          fullName: profileData?.full_name || "",
          email: profileData?.email || "",
          mobile: profileData?.phone || "",
          nationality: profileData?.nationality || "",
          residencyStatus: profileData?.residency_status || "",
          country: profileData?.country || "",
          city: profileData?.city || "",
          occupation: profileData?.occupation || "",
          nationalId: profileData?.national_id || "",
          profile_photo_url: profilePhotoSignedUrl,
          id_doc_url: idDocumentSignedUrl,
          years_of_experience: founderData?.years_of_experience || "",
          previous_startups_count: founderData?.previous_startups_count || "",
          current_employment_status:
            founderData?.current_employment_status || "",
          cofounder_count: founderData?.cofounder_count || "",
          team_members_count: founderData?.team_members_count || "",
          company_name: founderData?.company_name || "",
          company_registration_number:
            founderData?.company_registration_number || "",
          company_website_url: founderData?.company_website_url || "",
          company_linkedin_url: founderData?.company_linkedin_url || "",
          entrepreneurial_experience:
            founderData?.entrepreneurial_experience || "",
          team_skillset_summary: founderData?.team_skillset_summary || "",
          founder_vision_statement: founderData?.founder_vision_statement || "",
          long_term_goals: founderData?.long_term_goals || "",
          full_time_on_startup: founderData?.full_time_on_startup || false,
          has_tech_cofounder: founderData?.has_tech_cofounder || false,
          equity_split_clarity: founderData?.equity_split_clarity || false,
          has_cap_table: founderData?.has_cap_table || false,
          verification_doc_url: verificationDocSignedUrl,
          additional_info: founderData?.additional_info || "",
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
        is_active: form?.is_active,
        kyc_status: form?.kyc_status,
        is_verified: form?.is_verified,
        email: form.email,
        full_name: form.fullName,
        phone: form.mobile,
        nationality: form.nationality,
        national_id: form.nationalId,
        residency_status: form.residencyStatus,
        occupation: form.occupation,
        country: form.country,
        city: form.city,
      };

      const founderUpdate = {
        years_of_experience: form.years_of_experience || null,
        previous_startups_count: form.previous_startups_count || null,
        current_employment_status: form.current_employment_status || null,
        cofounder_count: form.cofounder_count || null,
        team_members_count: form.team_members_count || null,
        company_name: form.company_name || null,
        company_registration_number: form.company_registration_number || null,
        company_website_url: form.company_website_url || null,
        company_linkedin_url: form.company_linkedin_url || null,
        entrepreneurial_experience: form.entrepreneurial_experience || null,
        team_skillset_summary: form.team_skillset_summary || null,
        founder_vision_statement: form.founder_vision_statement || null,
        long_term_goals: form.long_term_goals || null,
        full_time_on_startup: form.full_time_on_startup,
        has_tech_cofounder: form.has_tech_cofounder,
        equity_split_clarity: form.equity_split_clarity,
        has_cap_table: form.has_cap_table,
        additional_info: form.additional_info || null,
      };

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
                  <span className="font-medium">Name:</span> {form.fullName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {form.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {form.mobile}
                </p>
                <p>
                  <span className="font-medium">Nationality:</span>{" "}
                  {form.nationality}
                </p>
                <p>
                  <span className="font-medium">Residency Status:</span>{" "}
                  {form.residencyStatus}
                </p>
                <p>
                  <span className="font-medium">Occupation:</span>{" "}
                  {form.occupation}
                </p>
                <p>
                  <span className="font-medium">National ID:</span>{" "}
                  {form.nationalId}
                </p>
                <p>
                  <span className="font-medium">Country:</span> {form.country}
                </p>
                <p>
                  <span className="font-medium">City:</span> {form.city}
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Founder / Startup Info */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                Startup Details:
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
                  {form.company_website_url}
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  {form.company_linkedin_url}
                </p>
                <p>
                  <span className="font-medium">Team Members:</span>{" "}
                  {form.team_members_count}
                </p>
                <p>
                  <span className="font-medium">Co-founders:</span>{" "}
                  {form.cofounder_count}
                </p>
                <p>
                  <span className="font-medium">Tech Co-founder:</span>{" "}
                  {form.has_tech_cofounder ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Full-Time on Startup:</span>{" "}
                  {form.full_time_on_startup ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Years Experience:</span>{" "}
                  {form.years_of_experience}
                </p>
                <p>
                  <span className="font-medium">Prev Startups:</span>{" "}
                  {form.previous_startups_count}
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Founder Vision */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                Founder Vision:
              </h3>
              <div className="mt-1 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Vision:</span>{" "}
                  {form.founder_vision_statement}
                </p>
                <p>
                  <span className="font-medium">Long-term Goals:</span>{" "}
                  {form.long_term_goals}
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* KYC Docs */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                KYC Documents:
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                {form.id_doc_url && (
                  <li>
                    <a
                      href={form.id_doc_url}
                      target="_blank"
                      className="text-green-600 underline"
                    >
                      View ID Document
                    </a>
                  </li>
                )}
                {form.verification_doc_url && (
                  <li>
                    <a
                      href={form.verification_doc_url}
                      target="_blank"
                      className="text-green-600 underline"
                    >
                      View Verification Doc
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
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
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
                  value={form.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                />
                <Input
                  label="Nationality"
                  placeholder="Enter nationality"
                  disabled
                  value={form.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
                <Input
                  label="Residency Status"
                  placeholder="Enter residency status"
                  disabled
                  value={form.residencyStatus}
                  onChange={(e) =>
                    handleChange("residencyStatus", e.target.value)
                  }
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
                <Input
                  label="National ID"
                  placeholder="Enter National ID"
                  disabled
                  value={form.nationalId}
                  onChange={(e) => handleChange("nationalId", e.target.value)}
                />
                <Input
                  label="Occupation"
                  placeholder="Enter occupation"
                  disabled
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-4 flex-wrap gap-4">
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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

          {/* Founder & Company Details */}
          <Card>
            <CardHeader>
              <CardTitle>Founder & Company Details</CardTitle>
              <CardDescription>
                Experience and company information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Years of Experience"
                  type="number"
                  disabled={isViewMode}
                  value={form.years_of_experience}
                  onChange={(e) =>
                    handleChange("years_of_experience", e.target.value)
                  }
                />
                <Input
                  label="Previous Startups Count"
                  type="number"
                  disabled={isViewMode}
                  value={form.previous_startups_count}
                  onChange={(e) =>
                    handleChange("previous_startups_count", e.target.value)
                  }
                />
                <Select
                  label="Current Employment Status"
                  placeholder="Select employment status"
                  required
                  disabled={isViewMode}
                  options={options.employmentStatuses}
                  value={form.current_employment_status}
                  onChange={(val) =>
                    handleChange("current_employment_status", val)
                  }
                />

                <Input
                  label="Co-founder Count"
                  type="number"
                  disabled={isViewMode}
                  value={form.cofounder_count}
                  onChange={(e) =>
                    handleChange("cofounder_count", e.target.value)
                  }
                />
                <Input
                  label="Team Members Count"
                  type="number"
                  disabled={isViewMode}
                  value={form.team_members_count}
                  onChange={(e) =>
                    handleChange("team_members_count", e.target.value)
                  }
                />
                <Input
                  label="Company Name"
                  value={form.company_name}
                  disabled={isViewMode}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <Input
                  label="Registration Number"
                  disabled={isViewMode}
                  value={form.company_registration_number}
                  onChange={(e) =>
                    handleChange("company_registration_number", e.target.value)
                  }
                />
                <Input
                  label="Company Website"
                  disabled={isViewMode}
                  value={form.company_website_url}
                  onChange={(e) =>
                    handleChange("company_website_url", e.target.value)
                  }
                />
                <Input
                  label="Company LinkedIn"
                  disabled={isViewMode}
                  value={form.company_linkedin_url}
                  onChange={(e) =>
                    handleChange("company_linkedin_url", e.target.value)
                  }
                />
              </div>

              {/* Boolean Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                <Checkbox
                  label="Working Full-time on Startup"
                  checked={form.full_time_on_startup}
                  disabled={isViewMode}
                  onCheckedChange={(v) =>
                    handleChange("full_time_on_startup", v)
                  }
                />
                <Checkbox
                  label="Has Tech Co-founder"
                  checked={form.has_tech_cofounder}
                  disabled={isViewMode}
                  onCheckedChange={(v) => handleChange("has_tech_cofounder", v)}
                />
                <Checkbox
                  label="Equity Split is Clear"
                  checked={form.equity_split_clarity}
                  disabled={isViewMode}
                  onCheckedChange={(v) =>
                    handleChange("equity_split_clarity", v)
                  }
                />
                <Checkbox
                  label="Has Cap Table"
                  disabled={isViewMode}
                  checked={form.has_cap_table}
                  onCheckedChange={(v) => handleChange("has_cap_table", v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Docs */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Documents</CardTitle>
              <CardDescription>KYC and verification documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  label="Entrepreneurial Experience"
                  value={form.entrepreneurial_experience}
                  disabled={isViewMode}
                  onChange={(e) =>
                    handleChange("entrepreneurial_experience", e.target.value)
                  }
                />
                <Textarea
                  label="Team Skillset Summary"
                  value={form.team_skillset_summary}
                  disabled={isViewMode}
                  onChange={(e) =>
                    handleChange("team_skillset_summary", e.target.value)
                  }
                />
                <Textarea
                  label="Vision Statement"
                  value={form.founder_vision_statement}
                  disabled={isViewMode}
                  onChange={(e) =>
                    handleChange("founder_vision_statement", e.target.value)
                  }
                />
                <Textarea
                  label="Long-term Goals"
                  value={form.long_term_goals}
                  disabled={isViewMode}
                  onChange={(e) =>
                    handleChange("long_term_goals", e.target.value)
                  }
                />

                <Textarea
                  label="Additional Info"
                  value={form.additional_info}
                  disabled={isViewMode}
                  onChange={(e) =>
                    handleChange("additional_info", e.target.value)
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
