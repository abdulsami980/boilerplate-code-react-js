/* eslint-disable react-hooks/exhaustive-deps */
import Stepper, { Step } from "@/components/reactbits/Stepper";
import { PageLoader } from "@/components/ui/Loaders";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import { getUserRole, getSignedUrl } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";

export default function Profile() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    mobile: "",
    nationality: "",
    residencyStatus: "",
    country: "",
    city: "",
    profilePhoto: null,
    nationalId: "",
    idDocument: null,
    occupation: "",
    companyName: "",
    websiteUrl: "",
    linkedinUrl: "",

    // Step 2
    minInvestment: "",
    maxInvestment: "",
    investmentExperienceYears: "",
    businessStage: "",
    businessModel: "",
    preferredLocation: "",
    preferredCurrency: "",
    annualIncomeBracket: "",
    involvementLevel: "",
    investmentInstrument: [],
    preferredSectors: [],
    taxNumber: "",
    sourceOfFunds: "",

    // Step 3
    proofOfIncomeUrl: null,
    additionalInfo: "",
    nda_signed: false,
    is_accredited_investor: false,
    consent_data_sharing: false,
    consent_marketing_emails: false,
    termsAccepted: false,

    // inside useState initial object (add these fields)
    profilePhotoPath: null,
    idDocumentPath: null,
    verificationDocPath: null,
    proofOfIncomePath: null,
  });

  const profileCache = new Map();

  // ✅ Validation per step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.profilePhoto ||
          !formData.fullName ||
          !formData.email ||
          !formData.mobile ||
          !formData.nationality ||
          !formData.nationalId ||
          !formData.country ||
          !formData.city ||
          !formData.taxNumber
        ) {
          toast.error("Please fill all required fields in Step 1.");
          return false;
        }
        return true;

      case 2:
        if (
          !formData.minInvestment ||
          !formData.maxInvestment ||
          !formData.businessStage ||
          !formData.businessModel ||
          !formData.annualIncomeBracket
        ) {
          toast.error("Please fill all required fields in Step 2.");
          return false;
        }
        return true;

      case 3:
        if (
          !formData.idDocument ||
          !formData.proofOfIncomeUrl ||
          !formData.termsAccepted ||
          !formData.nda_signed ||
          !formData.is_accredited_investor ||
          !formData.consent_data_sharing
        ) {
          toast.error("Please accept all required declarations in Step 3.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepHeader = (title, description) => (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-2 relative inline-block">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 text-sm md:text-base mb-6">{description}</p>
      )}
    </>
  );

  // ✅ Final submit
  const handleFinalSubmit = async () => {
    const loadingToast = toast.loading("Submitting your profile...");
    try {
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authUser?.user)
        throw new Error("User not authenticated.");
      const auth_uid = authUser.user.id;

      const uploadFile = async (bucket, file, existingPath = null) => {
        if (!file) return existingPath || null;

        if (typeof file === "string") {
          if (file.startsWith("http")) {
            return existingPath || null;
          }
          return file;
        }

        const { data } = await supabase.auth.getSession();
        const token = data?.session?.access_token;
        if (!token) throw new Error("Not authenticated");

        const supabaseAuth = createClient(
          import.meta.env.VITE_SUPA_BASE_PROJECT_URL,
          import.meta.env.VITE_SUPA_BASE_API_KEY,
          {
            global: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          }
        );

        const folder =
          role === "investor"
            ? "investors"
            : role === "founder"
            ? "founders"
            : "others";

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabaseAuth.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) throw error;

        return filePath; // ✅ return path to save in DB
      };

      const [
        profilePhotoPathRes,
        idDocumentPathRes,
        proofOfIncomePathRes,
      ] = await Promise.all([
        uploadFile(
          "profiles",
          formData.profilePhoto,
          formData.profilePhotoPath
        ),
        uploadFile("profiles", formData.idDocument, formData.idDocumentPath),
        uploadFile(
          "kyc-docs",
          formData.verificationDocPath
        ),
        uploadFile(
          "kyc-docs",
          formData.proofOfIncomeUrl,
          formData.proofOfIncomePath
        ),
      ]);

      // ✅ Update profiles table with checkboxes that belong there
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .update({
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.mobile,
          nationality: formData.nationality,
          national_id: formData?.nationalId || "",
          residency_status: formData.residencyStatus,
          occupation: formData.occupation,
          country: formData.country,
          city: formData.city,
          id_doc_url: idDocumentPathRes,
          profile_photo_url: profilePhotoPathRes || null, // path
          nda_signed: formData.nda_signed,
          consent_data_sharing: formData.consent_data_sharing,
          consent_marketing_emails: formData.consent_marketing_emails,
          termsAccepted: formData.termsAccepted,
        })
        .eq("auth_uid", auth_uid)
        .select()
        .single();

      // Investors table
      const { error: investorError } = await supabase.from("investors").upsert(
        {
          profile_id: profileData.id, // must include this!
          company_name: formData.companyName,
          website_url: formData.websiteUrl,
          linkedin_url: formData.linkedinUrl,
          min_investment: formData.minInvestment,
          max_investment: formData.maxInvestment,
          investment_experience_years: formData.investmentExperienceYears,
          investment_stage: formData.businessStage,
          business_model: formData.businessModel,
          preferred_location: formData.preferredLocation,
          preferred_currency: formData.preferredCurrency,
          annual_income_bracket: formData.annualIncomeBracket,
          involvement_level: formData.involvementLevel,
          investment_instrument: formData.investmentInstrument,
          preferred_sectors: formData.preferredSectors,
          tax_number: formData.taxNumber,
          source_of_funds: formData.sourceOfFunds,
          proof_of_income_url: proofOfIncomePathRes || null,
          additional_info: formData.additionalInfo,
          is_accredited_investor: formData.is_accredited_investor,
        },
        { onConflict: ["profile_id"] } // <--- this tells Supabase to update if profile_id exists
      );

      if (profileError) throw profileError;

      if (investorError) throw investorError;

      toast.dismiss(loadingToast);
      toast.success("Profile saved successfully!");

      // ✅ Navigate based on role
      switch (role) {
        case "admin":
          navigate(PATH.ADMIN.DASHBOARD);
          break;
        case "investor":
          navigate(PATH.INVESTOR.DASHBOARD);
          break;
        case "founder":
          navigate(PATH.FOUNDER.DASHBOARD);
          break;
        default:
          navigate(PATH.LANDING);
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error(err.message || "Submission failed. Try again.");
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchProfile = async () => {
      try {
        const { data: authUser, error: authError } =
          await supabase.auth.getUser();
        if (authError || !authUser?.user)
          throw new Error("User not authenticated.");
        const auth_uid = authUser.user.id;

        // Use cache if available
        if (profileCache.has(auth_uid)) {
          if (!ignore) {
            setFormData((prev) => ({ ...prev, ...profileCache.get(auth_uid) }));
            setLoading(false);
          }
          return;
        }

        // Fetch profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_uid", auth_uid)
          .single();
        if (profileError && profileError.code !== "PGRST116")
          throw profileError;

        // Fetch investors table
        let investorData = null;
        if (profileData) {
          const { data: invData, error: invErr } = await supabase
            .from("investors")
            .select("*")
            .eq("profile_id", profileData.id)
            .single();
          if (invErr && invErr.code !== "PGRST116") throw invErr;
          investorData = invData || null;
        }

        // Get signed URLs
        const profilePhotoPath = profileData?.profile_photo_url || null;
        const idDocumentPath = profileData?.id_doc_url || null;
        const verificationDocPath = investorData?.verification_doc_url || null;
        const proofOfIncomePath = investorData?.proof_of_income_url || null;

        // create signed URLs only for preview, but DON'T overwrite the DB path fields
        const [
          profilePhotoSignedUrl,
          idDocumentSignedUrl,
          proofOfIncomeSignedUrl,
        ] = await Promise.all([
          profilePhotoPath
            ? getSignedUrl("profiles", profilePhotoPath)
            : Promise.resolve(null),
          idDocumentPath
            ? getSignedUrl("profiles", idDocumentPath)
            : Promise.resolve(null),
          verificationDocPath
            ? getSignedUrl("kyc-docs", verificationDocPath)
            : Promise.resolve(null),
          proofOfIncomePath
            ? getSignedUrl("kyc-docs", proofOfIncomePath)
            : Promise.resolve(null),
        ]);

        // Merge into formData
        const merged = {
          fullName: profileData?.full_name || "",
          email: profileData?.email || "",
          occupation: profileData?.occupation || "",
          mobile: profileData?.phone || "",
          nationality: profileData?.nationality || "",
          residencyStatus: profileData?.residency_status || "",
          country: profileData?.country || "",
          city: profileData?.city || "",
          profilePhoto: profilePhotoSignedUrl,
          nationalId: profileData?.national_id || "",
          idDocument: idDocumentSignedUrl,

          companyName: investorData?.company_name || "",
          websiteUrl: investorData?.website_url || "",
          linkedinUrl: investorData?.linkedin_url || "",

          minInvestment: investorData?.min_investment || "",
          maxInvestment: investorData?.max_investment || "",
          investmentExperienceYears:
            investorData?.investment_experience_years || "",
          businessStage: investorData?.investment_stage || "",
          businessModel: investorData?.business_model || "",
          preferredLocation: investorData?.preferred_location || "",
          preferredCurrency: investorData?.preferred_currency || "",
          annualIncomeBracket: investorData?.annual_income_bracket || "",
          involvementLevel: investorData?.involvement_level || "",
          investmentInstrument: investorData?.investment_instrument || [],
          preferredSectors: investorData?.preferred_sectors || [],
          taxNumber: investorData?.tax_number || "",
          sourceOfFunds: investorData?.source_of_funds || "",
          proofOfIncomeUrl: proofOfIncomeSignedUrl,
          additionalInfo: investorData?.additional_info || "",

          // ✅ Checkboxes
          is_accredited_investor: investorData?.is_accredited_investor || false,
          nda_signed: profileData?.nda_signed || false,
          consent_data_sharing: profileData?.consent_data_sharing || false,
          consent_marketing_emails:
            profileData?.consent_marketing_emails || false,
          termsAccepted: profileData?.termsAccepted || false,

          // keep DB paths (used for saving if no new upload)
          profilePhotoPath,
          idDocumentPath,
          verificationDocPath,
          proofOfIncomePath,
        };

        profileCache.set(auth_uid, merged);

        if (!ignore) {
          setFormData((prev) => ({ ...prev, ...merged }));
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (!ignore) {
          toast.error("Failed to load profile data.");
          setLoading(false);
        }
      }
    };

    fetchProfile();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Stepper
      initialStep={1}
      backButtonText="Back"
      nextButtonText="Continue"
      beforeNextStep={(currentStep) => validateStep(currentStep)}
      onFinalStepCompleted={handleFinalSubmit}
    >
      <Step>
        {renderStepHeader(
          "Personal & Professional Information",
          "Fill out your personal details carefully. Fields marked with * are required."
        )}
        <Step1 formData={formData} handleChange={handleChange} />
      </Step>

      <Step>
        {renderStepHeader(
          "Investment Preferences",
          "Set your investment preferences carefully to help us match you with the right opportunities."
        )}
        <Step2 formData={formData} handleChange={handleChange} />
      </Step>

      <Step>
        {renderStepHeader(
          "Compliance & Final Declarations",
          "Upload necessary documents and agree to the terms to complete your profile."
        )}
        <Step3 formData={formData} handleChange={handleChange} />
      </Step>
    </Stepper>
  );
}
