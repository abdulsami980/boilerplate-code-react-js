import { Checkbox } from "@/components/ui/checkbox";
import { FileUploader } from "@/components/ui/FileUploader";
import LegalModal from "@/components/ui/LegalModal";
import { Textarea } from "@/components/ui/textarea";
import { LEGAL_CONTENT, NDA_CONTENT } from "@/config";
import { useEffect, useState } from "react";

export default function Step3({ formData, handleChange }) {
  const [showModal, setShowModal] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false); // Track which checkboxes were prefilled (loaded from server)
  const [prefilled, setPrefilled] = useState({
    termsAccepted: false,
    nda_signed: false,
    is_accredited_investor: false,
    consent_data_sharing: false,
  });

  // On mount: detect prefilled values
  useEffect(() => {
    setPrefilled({
      termsAccepted: !!formData.termsAccepted,
      nda_signed: !!formData.nda_signed,
      is_accredited_investor: !!formData.is_accredited_investor,
      consent_data_sharing: !!formData.consent_data_sharing,
    });
  }, []); // runs once, using initial formData

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Documents */}
      <FileUploader
        label="Upload ID Document"
        placeholder="No File Chosen"
        value={formData.idDocument}
        onChange={(file) => handleChange("idDocument", file)}
        tooltipText="Upload a government-issued identification document, such as your National Identity Card (CNIC) or Passport, to verify your personal identity."
        required
      />

      <FileUploader
        label="Upload Verification Document"
        value={formData.verificationDocUrl}
        onChange={(file) => handleChange("verificationDocUrl", file)}
        tooltipText="Submit your company verification or KYC document, such as a Certificate of Incorporation, Business Registration Certificate, or any official proof verifying your business identity."
        required
      />

      <FileUploader
        label="Upload Proof of Income"
        value={formData.proofOfIncomeUrl}
        onChange={(file) => handleChange("proofOfIncomeUrl", file)}
        tooltipText="Provide valid proof of income or financial standing, such as a recent bank statement, salary slip, investment portfolio summary, or tax return."
        required
      />

      {/* Additional Info */}
      <div className="col-span-1 md:col-span-3">
        <Textarea
          label="Additional Info"
          placeholder="Enter any additional information"
          value={formData.additionalInfo}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
          className="min-h-[120px] resize-y"
        />
      </div>
      {/* ---------- TERMS (Terms + Privacy) ---------- */}
      <div className="col-span-2">
        {prefilled?.termsAccepted ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You have already accepted the{" "}
            <a
              className="text-green-600 underline hover:cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Terms of Service
            </a>{" "}
            &{" "}
            <a
              className="text-green-600 underline hover:cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Privacy Policy
            </a>
            .
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

      {/* ---------- NDA ---------- */}
      <div className="col-span-2">
        {prefilled?.nda_signed ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You have already agreed to the{" "}
            <a
              className="text-green-600 underline hover:cursor-pointer"
              onClick={() => setShowNDAModal(true)}
            >
              Non-Disclosure Agreement
            </a>{" "}
            (NDA).
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

      {/* ---------- Accredited Investor ---------- */}
      <div className="col-span-2">
        {prefilled?.is_accredited_investor ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You have already confirmed accredited investor status.
          </p>
        ) : (
          <Checkbox
            label="I confirm that I am an accredited investor according to applicable laws and regulations."
            checked={formData.is_accredited_investor === true}
            required
            onCheckedChange={(val) =>
              handleChange("is_accredited_investor", val === true)
            }
          />
        )}
      </div>

      {/* ---------- Consent: Data Sharing ---------- */}
      <div className="col-span-2">
        {prefilled?.consent_data_sharing ? (
          <p className="text-sm text-gray-500 font-medium">
            ✅ You have already consented to data sharing with the platform and
            partners.
          </p>
        ) : (
          <Checkbox
            label="I consent to sharing my data with the platform and its partners for business and investment purposes."
            checked={formData.consent_data_sharing === true}
            required
            onCheckedChange={(val) =>
              handleChange("consent_data_sharing", val === true)
            }
          />
        )}
      </div>

      {/* ---------- Consent: Marketing Emails ---------- */}
      <div className="col-span-2">
        <Checkbox
          label="I want to receive marketing emails and new feature updates from the platform."
          checked={formData.consent_marketing_emails === true}
          onCheckedChange={(val) =>
            handleChange("consent_marketing_emails", val === true)
          }
        />
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
        title="Non-Disclosure Agreement (NDA)"
        content={NDA_CONTENT}
      />
    </div>
  );
}
