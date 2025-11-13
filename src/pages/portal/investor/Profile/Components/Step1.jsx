import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getCountriesOptions, getLookupOptions } from "@/lib/utils";

export default function Step1({ formData, handleChange }) {
  const countryOptions = getCountriesOptions();
  const residencyOptions = getLookupOptions("residency_status");
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Profile Photo */}
      <div className="md:col-span-2">
        <ImageUploader
          label="Profile Photo"
          required
          value={formData.profilePhoto}
          onChange={(file) => handleChange("profilePhoto", file)}
        />
      </div>

      {/* Personal Info */}
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        required
        disabled
        value={formData.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />

      <Input
        label="Email Address"
        type="email"
        required
        disabled
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <Input
        label="Mobile Number"
        placeholder="e.g., 0300 1234567"
        required
        type="number"
        value={formData.mobile}
        onChange={(e) => handleChange("mobile", e.target.value)}
      />

      {/* Nationality */}
      <Select
        label="Nationality"
        placeholder="Select nationality"
        options={countryOptions}
        value={formData.nationality}
        onChange={(val) => handleChange("nationality", val)}
        required
      />

      {/* Country */}
      <Select
        label="Country"
        placeholder="Select country"
        options={countryOptions}
        value={formData.country}
        onChange={(val) => handleChange("country", val)}
        required
      />

      <Input
        label="City"
        placeholder="Enter your city"
        required
        value={formData.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />

      <Input
        label="National ID / Passport Number"
        placeholder="Enter your national ID or passport number"
        required
        value={formData.nationalId}
        onChange={(e) => handleChange("nationalId", e.target.value)}
      />

      <Input
        label="Tax Number"
        placeholder="Enter your tax number"
        value={formData.taxNumber}
        required
        onChange={(e) => handleChange("taxNumber", e.target.value)}
      />

      {/* Residency Status */}
      <Select
        label="Residency Status"
        placeholder="Select residency status"
        options={residencyOptions}
        value={formData.residencyStatus}
        onChange={(val) => handleChange("residencyStatus", val)}
      />

      <Input
        label="Profession / Title"
        placeholder="Enter your profession"
        value={formData.occupation}
        onChange={(e) => handleChange("occupation", e.target.value)}
      />

      <Input
        label="Organization / Company Name"
        placeholder="Enter your organization name"
        value={formData.companyName}
        onChange={(e) => handleChange("companyName", e.target.value)}
      />

      <Input
        label="Website"
        placeholder="Enter website URL"
        value={formData.websiteUrl}
        onChange={(e) => handleChange("websiteUrl", e.target.value)}
        regex={/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/}
      />

      <Input
        label="LinkedIn Profile"
        placeholder="Enter LinkedIn link"
        value={formData.linkedinUrl}
        onChange={(e) => handleChange("linkedinUrl", e.target.value)}
        regex={
          /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/
        }
      />
    </div>
  );
}
