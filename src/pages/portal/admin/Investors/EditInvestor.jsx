"use client";
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
import { Textarea } from "@/components/ui/textarea";
import ToggleChips from "@/components/ui/ToggleChips";
import { useState } from "react";
import { toast } from "sonner";

export default function EditInvestor({ initialData = null }) {
  const blank = {
    id: "1",
    auth_uid: "abc123",
    is_verified: true,
    created_at: "2025-01-01",
    updated_at: "2025-01-15",
    role: "investor",
    country: "USA",
    city: "San Francisco",
    profile_photo_url:
      "https://images.unsplash.com/photo-1603415526960-f2f9d28c9d6d?fit=crop&w=200&q=80",
    kyc_status: "verified",
    email: "john.doe@example.com",
    full_name: "John Doe",
    phone: "+1 555 123 4567",
    profile_id: "INV-1001",
    min_investment: "10000",
    max_investment: "50000",
    consent_confidentiality: true,
    consent_terms: true,
    preferred_sectors: ["Tech", "Healthcare"],
    investment_stage: "Seed",
    business_model: "B2B SaaS",
    preferred_location: "USA",
    investment_instrument: "Equity",
    involvement_level: "Active",
    company_name: "Doe Ventures",
    website_url: "https://doeventures.com",
    linkedin_url: "https://linkedin.com/in/johndoe",
    investor_title: "Managing Partner",
    verification_doc_url: "sample-doc.pdf",
    additional_info: "Interested in early-stage tech startups.",
  };

  const [form, setForm] = useState(
    initialData ? { ...blank, ...initialData } : blank
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sampleSectors = [
    "Tech",
    "Healthcare",
    "Finance",
    "Energy",
    "Education",
    "Real Estate",
    "Agritech",
  ];

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    toast.success("Investor updated successfully!");
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setForm(blank);
    toast("Reverted changes");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header with Save Changes */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl text-[#10354a] font-semibold">
            Edit Investor
          </h1>
          <p className="text-sm text-slate-600">
            Update investor profile and preferences
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile & Attachments */}
        <aside className="space-y-6 lg:col-span-1 order-1">
          <div className="w-full bg-white rounded-xl shadow border border-slate-200 p-4 space-y-6">
            {/* Profile Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={IMAGES.SHAHID_AFRIDI_BG}
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
                  <span className="font-medium">Investor Title:</span>{" "}
                  {form.investor_title}
                </p>
                <p>
                  <span className="font-medium">Company Name:</span>{" "}
                  {form.company_name}
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
                      View Document
                    </a>
                  </li>
                ) : (
                  <li>No documents uploaded</li>
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
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
                <Input
                  label="Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Input
                  label="Country"
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
                <Input
                  label="City"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-sm text-slate-700 font-medium">
                  KYC Status:
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                  {form.kyc_status}
                </span>
                <Checkbox
                  label="Verified"
                  checked={form.is_verified}
                  onCheckedChange={(val) => handleChange("is_verified", val)}
                />
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
                  value={form.min_investment}
                  onChange={(e) =>
                    handleChange("min_investment", e.target.value)
                  }
                />
                <Input
                  label="Max Investment (USD)"
                  value={form.max_investment}
                  onChange={(e) =>
                    handleChange("max_investment", e.target.value)
                  }
                />
                <Input
                  label="Investment Stage"
                  value={form.investment_stage}
                  onChange={(e) =>
                    handleChange("investment_stage", e.target.value)
                  }
                />
                <Input
                  label="Business Model"
                  value={form.business_model}
                  onChange={(e) =>
                    handleChange("business_model", e.target.value)
                  }
                />
                <Input
                  label="Preferred Location"
                  value={form.preferred_location}
                  onChange={(e) =>
                    handleChange("preferred_location", e.target.value)
                  }
                />
                <Input
                  label="Investment Instrument"
                  value={form.investment_instrument}
                  onChange={(e) =>
                    handleChange("investment_instrument", e.target.value)
                  }
                />
                <Input
                  label="Involvement Level"
                  value={form.involvement_level}
                  onChange={(e) =>
                    handleChange("involvement_level", e.target.value)
                  }
                />
              </div>
              <ToggleChips
                label="Preferred Sectors"
                options={sampleSectors}
                selected={form.preferred_sectors}
                onChange={(newSelection) =>
                  setForm((prev) => ({
                    ...prev,
                    preferred_sectors: newSelection,
                  }))
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
                  value={form.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <Input
                  label="Investor Title"
                  value={form.investor_title}
                  onChange={(e) =>
                    handleChange("investor_title", e.target.value)
                  }
                />
                <Input
                  label="Website"
                  value={form.website_url}
                  onChange={(e) => handleChange("website_url", e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  value={form.linkedin_url}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <Textarea
                  label="Additional Info"
                  value={form.additional_info}
                  onChange={(e) =>
                    handleChange("additional_info", e.target.value)
                  }
                  className="min-h-[120px] md:col-span-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
