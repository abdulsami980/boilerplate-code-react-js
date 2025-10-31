import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/Loaders";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ToggleChips from "@/components/ui/ToggleChips";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import {
  getCountriesOptions,
  getLookupOptions,
  getSignedUrl,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditInvestor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    profile_photo_url: "",
    kyc_status: "pending",
    is_verified: false,
    is_active: false,
    min_investment: 0,
    max_investment: 0,
    investment_stage: "",
    business_model: "",
    preferred_location: "",
    involvement_level: "",
    preferred_sectors: [],
    company_name: "",
    website_url: "",
    linkedin_url: "",
    verification_doc_url: "",
    additional_info: "",

    nationality: "",
    residency_status: "",
    occupation: "",
    national_id: "",
    id_doc_url: "",
    investment_experience_years: "",
    preferred_currency: "",
    annual_income_bracket: "",
    investment_instrument: [],
    tax_number: "",
    source_of_funds: "",
    proof_of_income_url: "",
  });

  const countryOptions = getCountriesOptions();

  const options = {
    instruments: getLookupOptions("investment_instruments"),
    sectors: getLookupOptions("sectors"),
    income: getLookupOptions("income_bracket"),
    currencies: getLookupOptions("currency"),
    models: getLookupOptions("business_model"),
    stages: getLookupOptions("business_stage"),
    involvement: getLookupOptions("involvement_levels"),
    residencies: getLookupOptions("residency_status"),
  };

  const isViewMode = location.pathname.includes("/view/");

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);

    // ✅ Update profiles table with Stepper + existing fields
    const profileUpdate = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      city: form.city,
      is_verified: form.is_verified,
      is_active: form.is_active,
      kyc_status: form.kyc_status,

      // Stepper fields in profiles table
      nationality: form.nationality,
      residency_status: form.residency_status,
      occupation: form.occupation,
      national_id: form.national_id,
    };

    // ✅ Update investors table with Stepper + existing fields
    const investorUpdate = {
      min_investment: form.min_investment,
      max_investment: form.max_investment,
      investment_stage: form.investment_stage,
      business_model: form.business_model,
      preferred_location: form.preferred_location,
      investment_instrument: form.investment_instrument,
      involvement_level: form.involvement_level,
      preferred_sectors: form.preferred_sectors,
      company_name: form.company_name,
      website_url: form.website_url,
      linkedin_url: form.linkedin_url,

      additional_info: form.additional_info,
      investment_experience_years: form.investment_experience_years,
      preferred_currency: form.preferred_currency,
      annual_income_bracket: form.annual_income_bracket,
      tax_number: form.tax_number,
      source_of_funds: form.source_of_funds,
    };

    const [{ error: profileError }, { error: investorError }] =
      await Promise.all([
        supabase.from("profiles").update(profileUpdate).eq("id", form.id),
        supabase
          .from("investors")
          .update(investorUpdate)
          .eq("profile_id", form.id),
      ]);

    if (profileError || investorError) {
      toast.error("Failed to update investor");
      console.error(profileError || investorError);
    } else {
      toast.success("Investor updated successfully!");
      navigate(PATH.ADMIN.INVESTORS);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        setLoading(true);

        // Fetch profile
        const { data: profile, error: profileErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (profileErr || !profile) {
          toast.error("Profile not found");
          navigate(PATH.ADMIN.INVESTORS);
          return;
        }

        console.log("profile", profile);

        // Fetch investor
        const { data: investor, error: invErr } = await supabase
          .from("investors")
          .select("*")
          .eq("profile_id", profile.id)
          .maybeSingle();
        if (invErr || !investor) {
          toast.error("Investor not found");
          navigate(PATH.ADMIN.INVESTORS);
          return;
        }

        // ✅ Get signed URLs for images & docs
        console.log("Paths before generating signed URLs:", {
          profilePhotoPath: profile.profile_photo_url,
          idDocumentPath: profile.id_doc_url,
          verificationDocPath: investor.verification_doc_url,
          proofOfIncomePath: investor.proof_of_income_url,
        });

        const [
          profilePhotoSignedUrl,
          idDocumentSignedUrl,
          verificationDocSignedUrl,
          proofOfIncomeSignedUrl,
        ] = await Promise.all([
          getSignedUrl("profiles", profile?.profile_photo_url),
          getSignedUrl("profiles", profile?.id_doc_url),
          getSignedUrl("kyc-docs", investor?.verification_doc_url),
          getSignedUrl("kyc-docs", investor?.proof_of_income_url),
        ]);

        console.log("Signed URLs:", {
          profilePhotoSignedUrl,
          idDocumentSignedUrl,
          verificationDocSignedUrl,
          proofOfIncomeSignedUrl,
        });

        // Merge profile + investor + signed URLs
        setForm({
          id: profile.id || "",
          full_name: profile.full_name || investor.full_name || "",
          email: profile.email || investor.email || "",
          phone: profile.phone || investor.phone || "",
          country: profile.country || investor.country || "",
          city: profile.city || investor.city || "",
          profile_photo_url: profilePhotoSignedUrl,
          kyc_status: profile.kyc_status || "",
          is_verified: profile.is_verified || false,
          is_active: profile.is_active || false,
          min_investment:
            profile.min_investment ?? investor.min_investment ?? 0,
          max_investment:
            profile.max_investment ?? investor.max_investment ?? 0,
          investment_stage:
            profile.investment_stage || investor.investment_stage || "",
          business_model:
            profile.business_model || investor.business_model || "",
          preferred_location:
            profile.preferred_location || investor.preferred_location || "",
          involvement_level:
            profile.involvement_level || investor.involvement_level || "",
          preferred_sectors:
            profile.preferred_sectors || investor.preferred_sectors || [],
          company_name: profile.company_name || investor.company_name || "",

          website_url: profile.website_url || investor.website_url || "",
          linkedin_url: profile.linkedin_url || investor.linkedin_url || "",
          verification_doc_url: verificationDocSignedUrl || "",
          additional_info:
            profile.additional_info || investor.additional_info || "",
          nationality: profile.nationality || investor.nationality || "",
          residency_status:
            profile.residency_status || investor.residency_status || "",
          occupation: profile.occupation || investor.occupation || "",
          national_id: profile.national_id || investor.national_id || "",
          id_doc_url: idDocumentSignedUrl || "",
          investment_experience_years:
            investor.investment_experience_years || "",
          preferred_currency: investor.preferred_currency || "",
          annual_income_bracket: investor.annual_income_bracket || "",
          investment_instrument: investor.investment_instrument || [],
          tax_number: investor.tax_number || "",
          source_of_funds: investor.source_of_funds || "",
          proof_of_income_url: proofOfIncomeSignedUrl || "",
        });
      } catch (err) {
        console.error("Error fetching investor data:", err);
        toast.error("Failed to fetch investor data");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [id, navigate]);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header with Save Changes */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl text-[#10354a] font-semibold">
            {!isViewMode ? "Edit Investor" : "View Investor"}
          </h1>
          <p className="text-sm text-slate-600">
            {!isViewMode
              ? "Update investor profile and preferences"
              : "View investor profile and preferences"}
          </p>
        </div>
        {!isViewMode && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate(PATH.ADMIN.INVESTORS)}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              isLoading={isSubmitting}
              loadingText="Saving Investor Info..."
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
                src={form.profile_photo_url || IMAGES.RECTANGLE_PLACEHOLDER}
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
                  <span className="font-medium">Company Name:</span>{" "}
                  {form.company_name}
                </p>
                <p>
                  <span className="font-medium">Nationality:</span>{" "}
                  {form.nationality}
                </p>
                <p>
                  <span className="font-medium">Residency Status:</span>{" "}
                  {form.residency_status}
                </p>
                <p>
                  <span className="font-medium">Investor Title:</span>{" "}
                  {form.occupation}
                </p>
                <p>
                  <span className="font-medium">National ID:</span>{" "}
                  {form.national_id}
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

            {/* Investment Preferences */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                Investment Preferences:
              </h3>
              <div className="mt-1 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Sectors:</span>{" "}
                  {form.preferred_sectors.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Stage:</span>{" "}
                  {form.investment_stage}
                </p>
                <p>
                  <span className="font-medium">Min/Max:</span>{" "}
                  {form.min_investment} / {form.max_investment} USD
                </p>
                <p>
                  <span className="font-medium">Business Model:</span>{" "}
                  {form.business_model}
                </p>
                <p>
                  <span className="font-medium">Preferred Location:</span>{" "}
                  {form.preferred_location}
                </p>
                <p>
                  <span className="font-medium">Investment Instrument:</span>{" "}
                  {Array.isArray(form.investment_instrument)
                    ? form.investment_instrument.join(", ")
                    : form.investment_instrument || "-"}
                </p>
                <p>
                  <span className="font-medium">Involvement Level:</span>{" "}
                  {form.involvement_level}
                </p>
                <p>
                  <span className="font-medium">
                    Investment Experience (Years):
                  </span>{" "}
                  {form.investment_experience_years}
                </p>
                <p>
                  <span className="font-medium">Preferred Currency:</span>{" "}
                  {form.preferred_currency}
                </p>
                <p>
                  <span className="font-medium">Annual Income Bracket:</span>{" "}
                  {form.annual_income_bracket}
                </p>
                <p>
                  <span className="font-medium">Tax Number:</span>{" "}
                  {form.tax_number}
                </p>
                <p>
                  <span className="font-medium">Source of Funds:</span>{" "}
                  {form.source_of_funds}
                </p>
              </div>
            </section>
            <hr className="border-slate-200" />

            {/* Attachments */}
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-green-700">
                Attachments:
              </h3>
              <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                {form.verification_doc_url ? (
                  <li>
                    <a
                      href={form.verification_doc_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View Verification Document
                    </a>
                  </li>
                ) : (
                  <li>No verification document uploaded</li>
                )}
                {form.id_doc_url ? (
                  <li>
                    <a
                      href={form.id_doc_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View ID Document
                    </a>
                  </li>
                ) : (
                  <li>No ID document uploaded</li>
                )}
                {form.proof_of_income_url ? (
                  <li>
                    <a
                      href={form.proof_of_income_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      View Proof of Income
                    </a>
                  </li>
                ) : (
                  <li>No proof of income uploaded</li>
                )}
              </ul>
            </section>
            <hr className="border-slate-200" />

            {/* Additional Info */}
            {form.additional_info && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-green-700">
                  Additional Info:
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {form.additional_info}
                </p>
              </section>
            )}
          </div>
        </aside>

        {/* Right: Form */}
        <div className="lg:col-span-2 space-y-6 order-2">
          {/* Personal & Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal & Contact</CardTitle>
              <CardDescription>
                Basic profile information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  disabled
                  placeholder="Enter full name"
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
                <Input
                  label="Email"
                  disabled
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  disabled
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Select
                  label="Country"
                  placeholder="Select country"
                  options={countryOptions}
                  value={form.country}
                  disabled
                  onChange={(val) => handleChange("country", val)}
                />
                <Input
                  label="City"
                  disabled
                  placeholder="Enter city"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <Select
                  label="Nationality"
                  placeholder="Select nationality"
                  options={countryOptions}
                  disabled
                  value={form.nationality}
                  onChange={(val) => handleChange("nationality", val)}
                />
                <Select
                  label="Residency Status"
                  placeholder="Select residency status"
                  options={options.residencies}
                  value={form.residency_status}
                  onChange={(val) => handleChange("residency_status", val)}
                  disabled
                />
                <Input
                  label="National ID"
                  placeholder="Enter national ID"
                  disabled
                  value={form.national_id}
                  onChange={(e) => handleChange("national_id", e.target.value)}
                />
                <Input
                  label="Tax Number"
                  placeholder="Enter tax number"
                  disabled
                  value={form.tax_number}
                  onChange={(e) => handleChange("tax_number", e.target.value)}
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

          {/* Investment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>
                Investor's preferred sectors, stages, and investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Min Investment (USD)"
                  placeholder="Enter minimum investment"
                  disabled={isViewMode}
                  type="number"
                  value={form.min_investment}
                  onChange={(e) =>
                    handleChange("min_investment", e.target.value)
                  }
                />
                <Input
                  label="Max Investment (USD)"
                  placeholder="Enter maximum investment"
                  disabled={isViewMode}
                  value={form.max_investment}
                  type="number"
                  onChange={(e) =>
                    handleChange("max_investment", e.target.value)
                  }
                />
                <Select
                  label="Business Stage Preference"
                  placeholder="Select business stage"
                  disabled={isViewMode}
                  options={options.stages}
                  value={form.investment_stage}
                  onChange={(val) => handleChange("investment_stage", val)}
                />
                <Select
                  label="Preferred Business Model"
                  placeholder="Select business model"
                  disabled={isViewMode}
                  options={options.models}
                  value={form.business_model}
                  onChange={(val) => handleChange("business_model", val)}
                />
                <Select
                  label="Preferred Business Location"
                  placeholder="Select preferred business location"
                  options={countryOptions}
                  disabled={isViewMode}
                  value={form.preferred_location}
                  onChange={(val) => handleChange("preferred_location", val)}
                />
                <Select
                  label="Involvement Level"
                  placeholder="Select involvement level"
                  options={options.involvement}
                  value={form.involvement_level}
                  disabled={isViewMode}
                  onChange={(val) => handleChange("involvement_level", val)}
                />
              </div>
              <ToggleChips
                label="Investment Instrument"
                options={options.instruments}
                disabled={isViewMode}
                selected={form.investment_instrument}
                onChange={(val) => handleChange("investment_instrument", val)}
              />
              <ToggleChips
                label="Preferred Sectors"
                disabled={isViewMode}
                options={options.sectors}
                selected={form.preferred_sectors}
                onChange={(newSelection) =>
                  handleChange("preferred_sectors", newSelection)
                }
              />
            </CardContent>
          </Card>

          {/* Company & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Company & Compliance</CardTitle>
              <CardDescription>
                Details of the investor's company and professional title
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  placeholder="Enter company name"
                  disabled={isViewMode}
                  value={form.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <Input
                  label="Investor Title"
                  placeholder="Enter investor title"
                  disabled={isViewMode}
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
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
                  placeholder="Enter LinkedIn profile URL"
                  disabled={isViewMode}
                  value={form.linkedin_url}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Additional Info"
                  disabled={isViewMode}
                  value={form.additional_info}
                  onChange={(e) =>
                    handleChange("additional_info", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Identity & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Profile</CardTitle>
              <CardDescription>
                Experience, currency preference, and income details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Investment Experience (Years)"
                  placeholder="Enter investment experience"
                  disabled={isViewMode}
                  type="number"
                  value={form.investment_experience_years}
                  onChange={(e) =>
                    handleChange("investment_experience_years", e.target.value)
                  }
                />
                <Select
                  label="Preferred Currency"
                  placeholder="Select currency"
                  options={options.currencies}
                  disabled={isViewMode}
                  value={form.preferred_currency}
                  onChange={(val) => handleChange("preferred_currency", val)}
                />
                <Select
                  label="Annual Income Bracket"
                  placeholder="Select income bracket"
                  options={options.income}
                  disabled={isViewMode}
                  value={form.annual_income_bracket}
                  onChange={(val) => handleChange("annual_income_bracket", val)}
                />
              </div>
              <div className="mt-4">
                <Textarea
                  label="Source of Funds"
                  placeholder="Enter your source of funds"
                  value={form.source_of_funds}
                  onChange={(e) =>
                    handleChange("source_of_funds", e.target.value)
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
