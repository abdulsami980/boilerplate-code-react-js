/* eslint-disable react-hooks/exhaustive-deps */
import Stepper, { Step } from "@/components/reactbits/Stepper";
import { useState, useEffect } from "react";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import { toast } from "sonner";
import { PATH } from "@/config";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "@/lib/utils";
import { supabase } from "@/lib/supabase-client";
import { PageLoader } from "@/components/ui/Loaders";

export default function Profile() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    profilePhoto: null,
    nationalId: "",
    idDocument: null,
    organization: "",
    website: "",
    linkedin: "",
    profession: "",

    // Step 2
    minInvestment: "",
    maxInvestment: "",
    businessStage: "",
    businessModel: "",
    geographicFocus: "",
    investmentInstrument: "",
    portfolioSize: "",

    // Step 3
    kycDocs: null,
    ndaAgreed: false,
    termsAccepted: false,
    notes: "",
  });

  const profileCache = new Map();

  // ✅ Fetch existing data if profile already exists
  useEffect(() => {
    let ignore = false; // local guard for setting state after unmount

    const fetchProfile = async () => {
      try {
        const { data: authUser, error: authError } =
          await supabase.auth.getUser();
        if (authError || !authUser?.user)
          throw new Error("User not authenticated.");

        const auth_uid = authUser.user.id;

        // check module-level cache first
        if (profileCache.has(auth_uid)) {
          const cached = profileCache.get(auth_uid);
          if (!ignore) {
            setFormData((prev) => ({ ...prev, ...cached }));
            setLoading(false);
          }
          return;
        }

        // Fetch profile and investor in parallel
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_uid", auth_uid)
          .single();

        // Note: we cannot run the second query until we have profileData.id, so adjust:
        if (profileError && profileError.code !== "PGRST116")
          throw profileError;

        let investorResult = null;
        if (profileData) {
          const { data: invData, error: invErr } = await supabase
            .from("investors")
            .select("*")
            .eq("profile_id", profileData.id)
            .single();

          if (invErr && invErr.code !== "PGRST116") throw invErr;
          investorResult = invData || null;
        }

        // Build the object we want to cache & set
        const merged = {
          fullName: profileData?.full_name || "",
          email: profileData?.email || "",
          mobile: profileData?.phone || "",
          country: profileData?.country || "",
          city: profileData?.city || "",
          organization: investorResult?.company_name || "",
          website: investorResult?.website_url || "",
          linkedin: investorResult?.linkedin_url || "",
          profession: investorResult?.investor_title || "",
          minInvestment: investorResult?.min_investment || "",
          maxInvestment: investorResult?.max_investment || "",
          businessStage: investorResult?.investment_stage || "",
          businessModel: investorResult?.business_model || "",
          geographicFocus: investorResult?.preferred_location || "",
          investmentInstrument: investorResult?.investment_instrument || "",
          notes: investorResult?.additional_info || "",
          ndaAgreed: investorResult?.consent_confidentiality || false,
          termsAccepted: investorResult?.consent_terms || false,
          // you can add URLs if you want:
          profilePhoto: profileData?.profile_photo_url || null,
          idDocument: investorResult?.verification_doc_url || null,
          kycDocs: investorResult?.kyc_doc_url || null,
        };

        // cache it so future mounts don't re-fetch
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
      // if component unmounts, prevent state updates
      ignore = true;
    };
  }, []);

  // ✅ Validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.mobile ||
          !formData.country ||
          !formData.city ||
          !formData.nationalId
        ) {
          toast.error("Please fill all required fields.");
          return false;
        }
        return true;

      case 2:
        if (
          !formData.maxInvestment ||
          !formData.minInvestment ||
          !formData.businessStage ||
          !formData.businessModel
        ) {
          toast.error("Please fill all required fields.");
          return false;
        }
        return true;

      case 3:
        if (!formData.ndaAgreed || !formData.termsAccepted) {
          toast.error("Please agree to the terms and NDA.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // ✅ Update handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Step title renderer
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

  // ✅ Final submit handler (insert or update)
  const handleFinalSubmit = async () => {
    const loadingToast = toast.loading("Submitting your profile...");
    try {
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();
      if (authError || !authUser?.user)
        throw new Error("User not authenticated.");
      const auth_uid = authUser.user.id;

      const uploadFile = async (bucket, file) => {
        if (!file || typeof file === "string") return file;

        // ✅ Get the current session to extract the access_token
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.access_token) {
          throw new Error("User not authenticated. Please log in again.");
        }

        // ✅ Create a temporary client with the active access token
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        const fileName = `${Date.now()}-${file.name}`;

        // ✅ Upload with authenticated context
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(fileName);

        return publicUrl;
      };

      const [profilePhotoUrl, idDocumentUrl, kycDocUrl] = await Promise.all([
        uploadFile("profiles", formData.profilePhoto),
        uploadFile("profiles", formData.idDocument),
        uploadFile("kyc-docs", formData.kycDocs),
      ]);

      // ✅ Upsert into `profiles`
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            auth_uid,
            email: formData.email,
            full_name: formData.fullName,
            phone: formData.mobile,
            role,
            country: formData.country,
            city: formData.city,
            profile_photo_url: profilePhotoUrl || null,
            is_verified: false,
            kyc_status: "pending",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "auth_uid" }
        )
        .select()
        .single();

      if (profileError) throw profileError;

      // ✅ Upsert into `investors`
      const { error: investorError } = await supabase.from("investors").upsert(
        {
          profile_id: profileData.id,
          company_name: formData.organization,
          website_url: formData.website,
          linkedin_url: formData.linkedin,
          investor_title: formData.profession,
          min_investment: formData.minInvestment,
          max_investment: formData.maxInvestment,
          investment_stage: formData.businessStage,
          business_model: formData.businessModel,
          preferred_location: formData.geographicFocus,
          investment_instrument: formData.investmentInstrument,
          verification_doc_url: idDocumentUrl || null,
          kyc_doc_url: kycDocUrl || null,
          additional_info: formData.notes,
          consent_confidentiality: formData.ndaAgreed,
          consent_terms: formData.termsAccepted,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id" }
      );

      if (investorError) throw investorError;

      toast.dismiss(loadingToast);
      toast.success("Profile saved successfully!");

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
