import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function Step2({ formData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Input
        label="Minimum Investment (PKR)"
        placeholder="Enter minimum investment"
        required
        type="number"
        value={formData.minInvestment}
        onChange={(e) => handleChange("minInvestment", e.target.value)}
      />
      <Input
        label="Maximum Investment (PKR)"
        placeholder="Enter maximum investment"
        value={formData.maxInvestment}
        required
        type="number"
        onChange={(e) => handleChange("maxInvestment", e.target.value)}
      />

      <Select
        label="Business Stage Preference"
        placeholder="Select business stage"
        required
        options={[
          { label: "Seed", value: "Seed" },
          { label: "Early Stage", value: "Early Stage" },
          { label: "Growth", value: "Growth" },
          { label: "Mature", value: "Mature" },
        ]}
        value={formData.businessStage}
        onChange={(val) => handleChange("businessStage", val)}
      />

      <Select
        label="Preferred Business Model"
        placeholder="Select business model"
        required
        options={[
          { label: "B2B", value: "B2B" },
          { label: "B2C", value: "B2C" },
          { label: "D2C", value: "D2C" },
          { label: "SaaS", value: "SaaS" },
          { label: "Marketplace", value: "Marketplace" },
        ]}
        value={formData.businessModel}
        onChange={(val) => handleChange("businessModel", val)}
      />

      <Input
        label="Geographic Focus"
        placeholder="e.g., Karachi, Lahore, All Pakistan"
        value={formData.geographicFocus}
        onChange={(e) => handleChange("geographicFocus", e.target.value)}
      />

      <Select
        label="Investment Instrument"
        placeholder="Select investment instrument"
        options={[
          { label: "Equity", value: "Equity" },
          { label: "Convertible Note", value: "Convertible Note" },
          { label: "SAFE", value: "SAFE" },
          { label: "Debt", value: "Debt" },
          { label: "Revenue Sharing", value: "Revenue Sharing" },
        ]}
        value={formData.investmentInstrument}
        onChange={(val) => handleChange("investmentInstrument", val)}
      />
    </div>
  );
}
