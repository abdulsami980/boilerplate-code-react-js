import ToggleChips from "@/components/ui/ToggleChips";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCountriesOptions, getLookupOptions } from "@/lib/utils";

export default function Step2({ formData, handleChange }) {
  const options = {
    instruments: getLookupOptions("investment_instruments"),
    sectors: getLookupOptions("sectors"),
    income: getLookupOptions("income_bracket"),
    currencies: getLookupOptions("currency"),
    models: getLookupOptions("business_model"),
    stages: getLookupOptions("business_stage"),
    involvement: getLookupOptions("involvement_levels"),
  };

  const countryOptions = getCountriesOptions();

  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        {/* Investment Range */}
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
          required
          type="number"
          value={formData.maxInvestment}
          onChange={(e) => handleChange("maxInvestment", e.target.value)}
        />

        {/* Lookup-based Selects */}
        <Select
          label="Business Stage Preference"
          placeholder="Select business stage"
          required
          options={options.stages}
          value={formData.businessStage}
          onChange={(val) => handleChange("businessStage", val)}
        />
        <Select
          label="Preferred Business Model"
          placeholder="Select business model"
          required
          options={options.models}
          value={formData.businessModel}
          onChange={(val) => handleChange("businessModel", val)}
        />
        <Select
          label="Annual Income Bracket"
          placeholder="Select income bracket"
          options={options.income}
          value={formData.annualIncomeBracket}
          required
          onChange={(val) => handleChange("annualIncomeBracket", val)}
        />

        {/* Experience */}
        <Input
          label="Investment Experience (Years)"
          placeholder="Enter years of experience"
          type="number"
          value={formData.investmentExperienceYears}
          onChange={(e) =>
            handleChange("investmentExperienceYears", e.target.value)
          }
        />
        <Select
          label="Preferred Business Location"
          placeholder="Select preferred business location"
          options={countryOptions}
          value={formData.preferredLocation}
          onChange={(val) => handleChange("preferredLocation", val)}
        />

        <Select
          label="Preferred Currency"
          placeholder="Select currency"
          options={options.currencies}
          value={formData.preferredCurrency}
          onChange={(val) => handleChange("preferredCurrency", val)}
        />

        <Select
          label="Involvement Level"
          placeholder="Select involvement level"
          options={options.involvement}
          value={formData.involvementLevel}
          onChange={(val) => handleChange("involvementLevel", val)}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Source of Funds"
          placeholder="Enter your source of funds"
          value={formData.sourceOfFunds}
          onChange={(e) => handleChange("sourceOfFunds", e.target.value)}
        />
      </div>

      {/* Dynamic ToggleChips */}
      <ToggleChips
        label="Investment Instrument"
        options={options.instruments}
        selected={formData.investmentInstrument}
        onChange={(val) => handleChange("investmentInstrument", val)}
      />

      <ToggleChips
        label="Preferred Sectors"
        options={options.sectors}
        selected={formData.preferredSectors}
        onChange={(val) => handleChange("preferredSectors", val)}
      />
    </>
  );
}
