import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/Loaders";
import { Select } from "@/components/ui/select";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import {
  getCountriesOptions,
  getLookupOptions,
  getSignedUrl,
  getUserInfo,
} from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
  const { id } = getUserInfo();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProfile, setSavedProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    nationality: "",
    residency_status: "",
    occupation: "",
    national_id: "",
    profile_photo_url: "",
  });

  const [form, setForm] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    national_id: "",
    profile_photo_url: "",
    nationality: "",
    residency_status: "",
    occupation: "",
  });

  const countryOptions = getCountriesOptions();

  const options = {
    residencies: getLookupOptions("residency_status"),
  };

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setIsSubmitting(true);

    try {
      let profilePhotoPath = form.profile_photo_url;

      // If a new file is uploaded → upload & get path
      if (form?.profile_photo_url instanceof File) {
        profilePhotoPath = await uploadFile(
          "profiles",
          form.profile_photo_url,
          form.profile_photo_path // existing original path
        );
      }

      const profileUpdate = {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        nationality: form.nationality,
        residency_status: form.residency_status,
        occupation: form.occupation,
        national_id: form.national_id,
        profile_photo_url: profilePhotoPath, // ✅ stored as path
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", form.id);

      if (profileError) throw profileError;

      toast.success("Admin profile updated successfully!");
      navigate(PATH.ADMIN.DASHBOARD);
    } catch (err) {
      toast.error("Failed to update admin profile");
      console.error(err);
    }

    setIsSubmitting(false);
  };

  const uploadFile = async (bucket, file, existingPath = null) => {
    if (!file) return existingPath || null;

    // If it's an existing string path (not a File object)
    if (typeof file === "string") return file;

    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) throw new Error("Not authenticated");

    const supabaseAuth = createClient(
      import.meta.env.VITE_SUPA_BASE_PROJECT_URL,
      import.meta.env.VITE_SUPA_BASE_API_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    const folder = "admin";
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabaseAuth.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw error;

    return filePath; // ✅ save only path in DB
  };

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        setLoading(true);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("auth_uid", id)
          .maybeSingle();

        if (!profile) {
          toast.error("Profile not found");
          return;
        }

        const signedUrl = profile.profile_photo_url
          ? await getSignedUrl("profiles", profile.profile_photo_url)
          : null;

        setForm({
          id: profile.id,
          full_name: profile.full_name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          country: profile.country || "",
          city: profile.city || "",
          national_id: profile.national_id || "",
          nationality: profile.nationality || "",
          occupation: profile.occupation || "",
          residency_status: profile.residency_status || "",
          profile_photo_path: profile.profile_photo_url || null,
          profile_photo_url: signedUrl,
        });

        setSavedProfile({
          full_name: profile.full_name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          country: profile.country || "",
          city: profile.city || "",
          nationality: profile.nationality || "",
          occupation: profile.occupation || "",
          residency_status: profile.residency_status || "",
          national_id: profile.national_id || "",
          profile_photo_url: signedUrl,
        });
      } catch (err) {
        console.error("Error fetching:", err);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [id]);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header with Save Changes */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl text-[#10354a] font-semibold">Profile</h1>
          <p className="text-sm text-slate-600">
            Update your profile and preferences
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            isLoading={isSubmitting}
            loadingText="Saving Admin Profile..."
            className="w-full sm:w-auto"
          >
            Save Profile Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile & Attachments */}
        <aside className="space-y-6 lg:col-span-1 order-1">
          <div className="w-full bg-white rounded-xl shadow border border-slate-200 p-4 space-y-6">
            {/* Profile Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={
                  savedProfile.profile_photo_url || IMAGES.RECTANGLE_PLACEHOLDER
                }
                className="w-full h-full object-cover"
              />
            </div>

            {/* Personal Info */}
            <section className="space-y-2 text-sm">
              <h3 className="font-semibold text-green-700">Personal Info:</h3>
              <div className="mt-1 space-y-1 text-slate-600">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {savedProfile.full_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {savedProfile.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {savedProfile.phone}
                </p>
                <p>
                  <span className="font-medium">Nationality:</span>{" "}
                  {savedProfile.nationality}
                </p>
                <p>
                  <span className="font-medium">Residency Status:</span>{" "}
                  {savedProfile.residency_status}
                </p>
                <p>
                  <span className="font-medium">Occupation:</span>{" "}
                  {savedProfile.occupation}
                </p>
                <p>
                  <span className="font-medium">National ID:</span>{" "}
                  {savedProfile.national_id}
                </p>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {savedProfile.country}
                </p>
                <p>
                  <span className="font-medium">City:</span> {savedProfile.city}
                </p>
              </div>
            </section>
          </div>
        </aside>

        {/* Right: Form */}
        <div className="lg:col-span-2 space-y-6 order-2">
          {/* Personal & Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal & Contact</CardTitle>
              <CardDescription>
                Basic profile information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="md:col-span-2">
                <ImageUploader
                  label="Profile Photo"
                  value={form.profile_photo_url}
                  onChange={(file) => handleChange("profile_photo_url", file)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  disabled
                  value={form.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                />
                <Input
                  label="Email"
                  placeholder="Enter email address"
                  disabled
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  type="number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Select
                  label="Country"
                  placeholder="Select country"
                  options={countryOptions}
                  value={form.country}
                  onChange={(val) => handleChange("country", val)}
                />
                <Input
                  label="City"
                  placeholder="Enter city"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                <Select
                  label="Nationality"
                  placeholder="Select nationality"
                  options={countryOptions}
                  value={form.nationality}
                  onChange={(val) => handleChange("nationality", val)}
                />
                <Select
                  label="Residency Status"
                  placeholder="Select residency status"
                  options={options.residencies}
                  value={form.residency_status}
                  onChange={(val) => handleChange("residency_status", val)}
                />
                <Input
                  label="National ID"
                  placeholder="Enter national ID"
                  value={form.national_id}
                  onChange={(e) => handleChange("national_id", e.target.value)}
                />
                <Input
                  label="Occupation"
                  placeholder="Enter occupation"
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
