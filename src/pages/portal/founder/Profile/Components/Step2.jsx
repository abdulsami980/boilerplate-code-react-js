import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getLookupOptions } from "@/lib/utils";

export default function Step2({ formData, handleChange }) {
  const options = {
    employmentStatuses: getLookupOptions("employment_status"),
  };

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Company Name */}
      <Input
        label="Company Name"
        placeholder="Enter your startup name"
        required
        value={formData.company_name}
        onChange={(e) => handleChange("company_name", e.target.value)}
      />

      {/* Company Registration Number */}
      <Input
        label="Company Registration Number"
        required
        placeholder="Enter registration / incorporation number"
        value={formData.company_registration_number}
        onChange={(e) =>
          handleChange("company_registration_number", e.target.value)
        }
      />

      {/* Company Website */}
      <Input
        label="Company Website"
        required
        placeholder="Enter website link"
        value={formData.company_website_url}
        onChange={(e) => handleChange("company_website_url", e.target.value)}
        regex={/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/}
      />

      {/* LinkedIn URL */}
      <Input
        label="Company LinkedIn URL"
        required
        placeholder="Enter LinkedIn profile link"
        value={formData.company_linkedin_url}
        onChange={(e) => handleChange("company_linkedin_url", e.target.value)}
        regex={
          /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/
        }
      />

      {/* Years of Experience */}
      <Input
        label="Years of Experience"
        type="number"
        placeholder="Enter total years of experience"
        value={formData.years_of_experience}
        onChange={(e) => handleChange("years_of_experience", e.target.value)}
      />

      {/* Previous Startups Count */}
      <Input
        label="Previous Startups Count"
        type="number"
        placeholder="How many startups have you founded?"
        value={formData.previous_startups_count}
        onChange={(e) =>
          handleChange("previous_startups_count", e.target.value)
        }
      />

      {/* Current Employment Status */}
      <Select
        label="Current Employment Status"
        placeholder="Select employment status"
        options={options.employmentStatuses}
        value={formData.current_employment_status}
        onChange={(val) => handleChange("current_employment_status", val)}
      />

      {/* Co-founder Count */}
      <Input
        label="Number of Co-founders"
        type="number"
        placeholder="Enter count"
        value={formData.cofounder_count}
        onChange={(e) => handleChange("cofounder_count", e.target.value)}
      />

      {/* Team Members Count */}
      <Input
        label="Team Size"
        type="number"
        placeholder="Total team members"
        value={formData.team_members_count}
        onChange={(e) => handleChange("team_members_count", e.target.value)}
      />

      {/* Entrepreneurial Experience */}
      <div className="md:col-span-2">
        <Textarea
          label="Entrepreneurial Experience"
          required
          placeholder="Tell us about your entrepreneurial background"
          value={formData.entrepreneurial_experience}
          onChange={(e) =>
            handleChange("entrepreneurial_experience", e.target.value)
          }
        />
      </div>

      {/* Vision */}
      <div className="md:col-span-2">
        <Textarea
          label="Founder Vision Statement"
          required
          placeholder="Your long-term vision"
          value={formData.founder_vision_statement}
          onChange={(e) =>
            handleChange("founder_vision_statement", e.target.value)
          }
        />
      </div>

      {/* Long-Term Goals */}
      <div className="md:col-span-2">
        <Textarea
          label="Long-Term Goals"
          placeholder="Where do you see your venture going?"
          value={formData.long_term_goals}
          onChange={(e) => handleChange("long_term_goals", e.target.value)}
        />
      </div>

      {/* Team Skills */}
      <div className="md:col-span-2">
        <Textarea
          label="Team Skillset Summary"
          placeholder="Describe your team's core skills"
          value={formData.team_skillset_summary}
          onChange={(e) =>
            handleChange("team_skillset_summary", e.target.value)
          }
        />
      </div>

      <div className="md:col-span-2 space-y-4">
        <Checkbox
          label={
            <span>
              I am currently working full-time on my startup and dedicating my
              primary time and effort to building and scaling this venture.
            </span>
          }
          checked={formData.full_time_on_startup === true}
          onCheckedChange={(val) =>
            handleChange("full_time_on_startup", val === true)
          }
        />

        <Checkbox
          label={
            <span>
              My founding team includes a technical co-founder who is
              responsible for leading product development and technology
              strategy.
            </span>
          }
          checked={formData.has_tech_cofounder === true}
          onCheckedChange={(val) =>
            handleChange("has_tech_cofounder", val === true)
          }
        />

        <Checkbox
          label={
            <span>
              The equity split among founders is clearly defined, mutually
              agreed upon, and formally documented.
            </span>
          }
          checked={formData.equity_split_clarity === true}
          onCheckedChange={(val) =>
            handleChange("equity_split_clarity", val === true)
          }
        />

        <Checkbox
          label={
            <span>
              Our startup maintains an official and updated cap table outlining
              equity ownership and founder shares.
            </span>
          }
          checked={formData.has_cap_table === true}
          onCheckedChange={(val) => handleChange("has_cap_table", val === true)}
        />
      </div>
    </div>
  );
}
