"use client";
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
import { useState } from "react";
import { toast } from "sonner";

export default function EditFounder({ initialData = null }) {
  const blank = {
    id: "1",
    auth_uid: "abc123",
    is_verified: false,
    created_at: "2025-01-01",
    updated_at: "2025-01-15",
    role: "founder",
    country: "USA",
    city: "San Francisco",
    profile_photo_url:
      "https://images.unsplash.com/photo-1603415526960-f2f9d28c9d6d?fit=crop&w=200&q=80",
    kyc_status: "pending",
    email: "jane.doe@example.com",
    full_name: "Jane Doe",
    phone: "+1 555 987 6543",
    profile_id: "FND-1001",
    team_members_count: 5,
    consent_terms: false,
    consent_data_usage: false,
    company_name: "Doe Innovations",
    company_registration_number: "REG-12345",
    website_url: "https://doeinnovations.com",
    linkedin_url: "https://linkedin.com/in/janedoe",
    kyc_front_url: "kyc-front.pdf",
    kyc_back_url: "kyc-back.pdf",
  };

  const [form, setForm] = useState(
    initialData ? { ...blank, ...initialData } : blank
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    toast.success("Founder updated successfully!");
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setForm(blank);
    toast("Reverted changes");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl text-[#10354a] font-semibold">
            Edit Founder
          </h1>
          <p className="text-sm text-slate-600">
            Update founder profile and company info
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
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Input
                  label="Country"
                  placeholder="Enter country"
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
                <Input
                  label="City"
                  placeholder="Enter city"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <Checkbox
                  label="Verified"
                  checked={form.is_verified}
                  onCheckedChange={(val) => handleChange("is_verified", val)}
                />
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
                  placeholder="Enter company name"
                  value={form.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
                <Input
                  label="Registration Number"
                  placeholder="Enter registration number"
                  value={form.company_registration_number}
                  onChange={(e) =>
                    handleChange("company_registration_number", e.target.value)
                  }
                />
                <Input
                  label="Website"
                  placeholder="Enter website URL"
                  value={form.website_url}
                  onChange={(e) => handleChange("website_url", e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  placeholder="Enter LinkedIn URL"
                  value={form.linkedin_url}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                />
                <Input
                  label="Team Members Count"
                  type="number"
                  placeholder="Enter number of team members"
                  value={form.team_members_count}
                  onChange={(e) =>
                    handleChange("team_members_count", e.target.value)
                  }
                />
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Checkbox
                  label="Consent Terms"
                  checked={form.consent_terms}
                  onCheckedChange={(val) => handleChange("consent_terms", val)}
                />
                <Checkbox
                  label="Consent Data Usage"
                  checked={form.consent_data_usage}
                  onCheckedChange={(val) =>
                    handleChange("consent_data_usage", val)
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
