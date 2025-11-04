import { Checkbox } from "@/components/ui/checkbox";
import { FileUploader } from "@/components/ui/FileUploader";
import LegalModal from "@/components/ui/LegalModal";
import { Textarea } from "@/components/ui/textarea";
import { LEGAL_CONTENT, NDA_CONTENT } from "@/config";
import { useState } from "react";

export default function Step3({ formData, handleChange }) {
  const [showModal, setShowModal] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);

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
      {/* ✅ Terms Accepted */}
      <div className="col-span-2">
        {formData.termsAccepted ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You have already accepted the Terms of Service & Privacy Policy.
          </p>
        ) : (
          <Checkbox
            label={
              <>
                I accept the{" "}
                <a
                  className="text-green-600 underline hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="text-green-600 underline hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Privacy Policy
                </a>
              </>
            }
            checked={formData.termsAccepted === true}
            required
            onCheckedChange={(val) =>
              handleChange("termsAccepted", val === true)
            }
          />
        )}
      </div>

      {/* ✅ NDA Signed */}
      <div className="col-span-2">
        {formData.nda_signed ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ NDA already accepted.
          </p>
        ) : (
          <Checkbox
            label={
              <>
                I confirm that I have read and agree to the{" "}
                <a
                  className="text-green-600 underline hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNDAModal(true);
                  }}
                >
                  Non-Disclosure Agreement (NDA)
                </a>
              </>
            }
            checked={formData.nda_signed === true}
            required
            onCheckedChange={(val) => handleChange("nda_signed", val === true)}
          />
        )}
      </div>

      {/* ✅ Accredited Founder */}
      <div className="col-span-2">
        {formData.is_accredited_founder ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ Accredited founder confirmed.
          </p>
        ) : (
          <Checkbox
            label={`I confirm that all information provided is accurate and truthful.`}
            checked={formData.is_accredited_founder === true}
            required
            onCheckedChange={(val) =>
              handleChange("is_accredited_founder", val === true)
            }
          />
        )}
      </div>

      {/* ✅ Consent Data Sharing */}
      <div className="col-span-2">
        {formData.consent_data_sharing ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You already consented to data sharing.
          </p>
        ) : (
          <Checkbox
            label="I consent to sharing my data with the platform and its partners for business growth and investment purposes."
            checked={formData.consent_data_sharing === true}
            required
            onCheckedChange={(val) =>
              handleChange("consent_data_sharing", val === true)
            }
          />
        )}
      </div>

      {/* ✅ Consent Marketing Emails */}
      <div className="col-span-2">
        {formData.consent_marketing_emails ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You already opted-in for marketing updates.
          </p>
        ) : (
          <Checkbox
            label="I want to receive marketing emails and new feature updates."
            checked={formData.consent_marketing_emails === true}
            onCheckedChange={(val) =>
              handleChange("consent_marketing_emails", val === true)
            }
          />
        )}
      </div>

      <LegalModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Terms & Privacy"
        content={LEGAL_CONTENT}
      />

      <LegalModal
        open={showNDAModal}
        onClose={() => setShowNDAModal(false)}
        title="Non-Disclosure Agreement"
        content={NDA_CONTENT}
      />
    </div>
  );
}
