import { Checkbox } from "@/components/ui/checkbox";
import { FileUploader } from "@/components/ui/FileUploader";
import { Textarea } from "@/components/ui/textarea";

export default function Step3({ formData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* File uploader: half width */}
      <div>
        <FileUploader
          label="Upload KYC / AML Documents (PDF, JPEG, PNG - Max 10MB)"
          onChange={(file) => handleChange("kycDocs", file)}
          required
        />
      </div>

      {/* Empty placeholder to align grid (optional) */}
      <div />

      {/* NDA Checkbox */}
      <div className="col-span-2">
        <Checkbox
          label="I agree to the Non-Disclosure Agreement (NDA)"
          checked={formData.ndaAgreed === true}
          required
          onCheckedChange={(val) => handleChange("ndaAgreed", val === true)}
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

      {/* Textarea */}
      <div className="col-span-2">
        <Textarea
          placeholder="Any additional info you'd like to share..."
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="min-h-[120px] resize-y" // ensures enough height and resizable
        />
      </div>
    </div>
  );
}
