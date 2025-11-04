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

export default function FounderProfile() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    // Step 1
    profile_photo_url: null,
    fullName: "",
    email: "",
    mobile: "",
    nationality: "",
    residencyStatus: "",
    country: "",
    city: "",
    nationalId: "",
    occupation: "",

    // Step 2
    years_of_experience: "",
    previous_startups_count: "",
    current_employment_status: "",
    cofounder_count: "",
    team_members_count: "",
    company_name: "",
    company_registration_number: "",
    company_website_url: "",
    company_linkedin_url: "",
    entrepreneurial_experience: "",
    team_skillset_summary: "",
    founder_vision_statement: "",
    long_term_goals: "",
    full_time_on_startup: false,
    has_tech_cofounder: false,
    equity_split_clarity: false,
    has_cap_table: false,

    // Step 3
    verification_doc_url: null,
    id_doc_url: null,
    additional_info: "",
    termsAccepted: false,
    nda_signed: false,
    is_accredited_founder: false,
    consent_data_sharing: false,
    consent_marketing_emails: false,

    // inside useState initial object (add these fields)
    profilePhotoPath: null,
    idDocumentPath: null,
    verificationDocPath: null,
  });

  const profileCache = new Map();

  // ✅ Fetch existing profile + investor data

  // ✅ Validation per step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.mobile ||
          !formData.nationalId ||
          !formData.country ||
          !formData.city
        ) {
          toast.error("Please fill all required fields in Step 1.");
          return false;
        }
        return true;

      case 2:
        if (
          !formData.current_employment_status ||
          !formData.company_name ||
          !formData.company_registration_number ||
          !formData.company_website_url ||
          !formData.company_linkedin_url ||
          !formData.entrepreneurial_experience ||
          !formData.founder_vision_statement
        ) {
          toast.error("Please fill all required fields in Step 2.");
          return false;
        }
        return true;

      case 3:
        if (
          !formData.nda_signed ||
          !formData.termsAccepted ||
          !formData.is_accredited_founder
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

        const folder = "founders";

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabaseAuth.storage
          .from(bucket)
          .upload(filePath, file);

        if (error) throw error;

        return filePath; // ✅ return path to save in DB
      };

      const [profilePhotoPathRes, idDocumentPathRes, verificationDocPathRes] =
        await Promise.all([
          uploadFile(
            "profiles",
            formData.profile_photo_url,
            formData.profilePhotoPath
          ),
          uploadFile("profiles", formData.id_doc_url, formData.idDocumentPath),
          uploadFile(
            "kyc-docs",
            formData.verification_doc_url,
            formData.verificationDocPath
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
          national_id: formData.nationalId,
          residency_status: formData.residencyStatus,
          occupation: formData.occupation,
          country: formData.country,
          city: formData.city,
          id_doc_url: idDocumentPathRes,
          profile_photo_url: profilePhotoPathRes || null,
          nda_signed: formData.nda_signed,
          consent_data_sharing: formData.consent_data_sharing,
          consent_marketing_emails: formData.consent_marketing_emails,
          termsAccepted: formData.termsAccepted,
        })
        .eq("auth_uid", auth_uid)
        .select()
        .single();

      // Founders table
      const { error: founderError } = await supabase.from("founders").upsert(
        {
          profile_id: profileData.id, // ✅ required for matching
          years_of_experience: formData.years_of_experience || null,
          previous_startups_count: formData.previous_startups_count || null,
          current_employment_status: formData.current_employment_status || null,
          cofounder_count: formData.cofounder_count || null,
          team_members_count: formData.team_members_count || null,
          company_name: formData.company_name || null,
          company_registration_number:
            formData.company_registration_number || null,
          company_website_url: formData.company_website_url || null,
          company_linkedin_url: formData.company_linkedin_url || null,
          entrepreneurial_experience:
            formData.entrepreneurial_experience || null,
          team_skillset_summary: formData.team_skillset_summary || null,
          founder_vision_statement: formData.founder_vision_statement || null,
          long_term_goals: formData.long_term_goals || null,
          full_time_on_startup: formData.full_time_on_startup,
          has_tech_cofounder: formData.has_tech_cofounder,
          equity_split_clarity: formData.equity_split_clarity,
          has_cap_table: formData.has_cap_table,
          is_accredited_founder: formData.is_accredited_founder,
          verification_doc_url: verificationDocPathRes || null,
          additional_info: formData.additional_info || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id" } // ✅ tells Supabase to match by profile_id
      );

      if (profileError) throw profileError;

      if (founderError) throw founderError;

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

        // Cache
        if (profileCache.has(auth_uid)) {
          if (!ignore) {
            setFormData((prev) => ({ ...prev, ...profileCache.get(auth_uid) }));
            setLoading(false);
          }
          return;
        }

        // Fetch Profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_uid", auth_uid)
          .single();

        if (profileError && profileError.code !== "PGRST116")
          throw profileError;

        // Fetch Founder Data
        let founderData = null;
        if (profileData) {
          const { data: fData, error: fErr } = await supabase
            .from("founders")
            .select("*")
            .eq("profile_id", profileData.id)
            .single();

          if (fErr && fErr.code !== "PGRST116") throw fErr;
          founderData = fData || null;
        }

        // File paths (stored in DB)
        const profilePhotoPath = profileData?.profile_photo_url || null;
        const idDocumentPath = profileData?.id_doc_url || null;
        const verificationDocPath = founderData?.verification_doc_url || null;

        // Signed preview URLs
        const [
          profilePhotoSignedUrl,
          idDocumentSignedUrl,
          verificationDocSignedUrl,
        ] = await Promise.all([
          profilePhotoPath ? getSignedUrl("profiles", profilePhotoPath) : null,
          idDocumentPath ? getSignedUrl("profiles", idDocumentPath) : null,
          verificationDocPath
            ? getSignedUrl("kyc-docs", verificationDocPath)
            : null,
        ]);

        const merged = {
          // ✅ Profiles table
          fullName: profileData?.full_name || "",
          email: profileData?.email || "",
          mobile: profileData?.phone || "",
          nationality: profileData?.nationality || "",
          residencyStatus: profileData?.residency_status || "",
          country: profileData?.country || "",
          city: profileData?.city || "",
          occupation: profileData?.occupation || "",
          nationalId: profileData?.national_id || "",

          profile_photo_url: profilePhotoSignedUrl,
          id_doc_url: idDocumentSignedUrl,

          // ✅ Founders table
          years_of_experience: founderData?.years_of_experience || "",
          previous_startups_count: founderData?.previous_startups_count || "",
          current_employment_status:
            founderData?.current_employment_status || "",
          cofounder_count: founderData?.cofounder_count || "",
          team_members_count: founderData?.team_members_count || "",
          company_name: founderData?.company_name || "",
          company_registration_number:
            founderData?.company_registration_number || "",
          company_website_url: founderData?.company_website_url || "",
          company_linkedin_url: founderData?.company_linkedin_url || "",
          entrepreneurial_experience:
            founderData?.entrepreneurial_experience || "",
          team_skillset_summary: founderData?.team_skillset_summary || "",
          founder_vision_statement: founderData?.founder_vision_statement || "",
          long_term_goals: founderData?.long_term_goals || "",
          full_time_on_startup: founderData?.full_time_on_startup || false,
          has_tech_cofounder: founderData?.has_tech_cofounder || false,
          equity_split_clarity: founderData?.equity_split_clarity || false,
          has_cap_table: founderData?.has_cap_table || false,
          verification_doc_url: verificationDocSignedUrl,
          additional_info: founderData?.additional_info || "",

          // ✅ Checkboxes (profiles)
          nda_signed: profileData?.nda_signed || false,
          consent_data_sharing: profileData?.consent_data_sharing || false,
          consent_marketing_emails:
            profileData?.consent_marketing_emails || false,
          termsAccepted: profileData?.termsAccepted || false,
          is_accredited_founder: founderData?.is_accredited_founder || false,

          // ✅ DB paths (used if no new file upload)
          profilePhotoPath,
          idDocumentPath,
          verificationDocPath,
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
      {/* STEP 1 */}
      <Step>
        {renderStepHeader(
          "Founder Information",
          "Tell us about yourself and your background as a founder."
        )}
        <Step1 formData={formData} handleChange={handleChange} />
      </Step>

      {/* STEP 2 */}
      <Step>
        {renderStepHeader(
          "Startup & Vision",
          "Provide details about your startup, team, and long-term vision."
        )}
        <Step2 formData={formData} handleChange={handleChange} />
      </Step>

      {/* STEP 3 */}
      <Step>
        {renderStepHeader(
          "Verification & Declarations",
          "Upload verification documents and agree to compliance requirements."
        )}
        <Step3 formData={formData} handleChange={handleChange} />
      </Step>
    </Stepper>
  );
}
