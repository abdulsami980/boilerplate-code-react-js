import { Checkbox } from "@/components/ui/checkbox";
import { FileUploader } from "@/components/ui/FileUploader";
import { Textarea } from "@/components/ui/textarea";

export default function Step3({ formData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Documents */}
      <FileUploader
        label="Upload Verification Document"
        value={formData.verification_doc_url}
        onChange={(file) => handleChange("verification_doc_url", file)}
        required
      />
      <FileUploader
        label="Upload ID Document"
        placeholder="No File Chosen"
        value={formData.id_doc_url}
        onChange={(file) => handleChange("id_doc_url", file)}
        required
      />
      {/* Additional Info */}
      <div className="col-span-2">
        <Textarea
          label="Additional Info"
          placeholder="Enter any additional information"
          value={formData.additional_info}
          onChange={(e) => handleChange("additional_info", e.target.value)}
          className="min-h-[120px] resize-y"
        />
      </div>
      {/* Terms Checkbox */}
      <div className="col-span-2">
        <Checkbox
          label={
            <>
              I accept the{" "}
              <a href="/terms" className="text-green-600 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-green-600 underline">
                Privacy Policy
              </a>
            </>
          }
          checked={formData.termsAccepted === true}
          required
          onCheckedChange={(val) => handleChange("termsAccepted", val === true)}
        />
      </div>
      {/* NDA Signed */}
      <div className="col-span-2">
        <Checkbox
          label={
            <>
              I confirm that I have read and agree to the{" "}
              <a href="/nda" className="text-green-600 underline">
                Non-Disclosure Agreement (NDA)
              </a>
            </>
          }
          checked={formData.nda_signed === true}
          required
          onCheckedChange={(val) => handleChange("nda_signed", val === true)}
        />
      </div>
      {/* Accredited Investor */}
      <div className="col-span-2">
        <Checkbox
          label={
            <>
              I confirm that all information provided about myself and the
              company is accurate and truthful to the best of my knowledge.
            </>
          }
          checked={formData.is_accredited_founder === true}
          required
          onCheckedChange={(val) =>
            handleChange("is_accredited_founder", val === true)
          }
        />
      </div>
      {/* Consent Data Sharing */}
      <div className="col-span-2">
        <Checkbox
          label={
            <>
              I consent to sharing my data with the platform and its partners
              for business and investment purposes.
            </>
          }
          checked={formData.consent_data_sharing === true}
          required
          onCheckedChange={(val) =>
            handleChange("consent_data_sharing", val === true)
          }
        />
      </div>
      {/* Consent Marketing Emails */}
      <div className="col-span-2">
        <Checkbox
          label={
            <>
              I want to receive marketing emails and new feature updates from
              the platform.
            </>
          }
          checked={formData.consent_marketing_emails === true}
          onCheckedChange={(val) =>
            handleChange("consent_marketing_emails", val === true)
          }
        />
      </div>
    </div>
  );
}
