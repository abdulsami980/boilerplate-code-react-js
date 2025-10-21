import { FileUploader } from "@/components/ui/FileUploader";
import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";

export default function Step1({ formData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* ImageUploader */}
      <div className="md:col-span-2">
        <ImageUploader
          label="Profile Photo"
          required
          value={formData.profilePhoto}
          onChange={(file) => handleChange("profilePhoto", file)}
        />
      </div>

      <Input
        label="Full Name"
        placeholder="Enter your full name"
        required
        value={formData.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
        regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
        regexMessage="Please enter a valid email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <Input
        label="Mobile Number"
        placeholder="e.g., +92 300 1234567"
        required
        value={formData.mobile}
        onChange={(e) => handleChange("mobile", e.target.value)}
      />

      <Input
        label="Country"
        placeholder="Enter your country"
        required
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
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

      <FileUploader
        label="Upload ID Document"
        onChange={(file) => handleChange("idDocument", file)}
        required
      />

      <Input
        label="Organization / Company Name"
        placeholder="Enter your organization or company name"
        value={formData.organization}
        onChange={(e) => handleChange("organization", e.target.value)}
      />
      <Input
        label="Website"
        placeholder="Enter your website URL"
        value={formData.website}
        onChange={(e) => handleChange("website", e.target.value)}
      />
      <Input
        label="LinkedIn Profile"
        placeholder="Enter your LinkedIn profile link"
        value={formData.linkedin}
        onChange={(e) => handleChange("linkedin", e.target.value)}
      />
      <Input
        label="Profession / Title"
        placeholder="Enter your profession or job title"
        value={formData.profession}
        onChange={(e) => handleChange("profession", e.target.value)}
      />
      <Input
        label="Approx. Portfolio Size (PKR)"
        placeholder="e.g., 10,000,000"
        value={formData.portfolioSize}
        onChange={(e) => handleChange("portfolioSize", e.target.value)}
      />
    </div>
  );
}
