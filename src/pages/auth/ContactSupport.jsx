import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/FileUploader";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LeftSection } from "./Login";

export default function ContactSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState({
    ticketTypes: [],
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    subject: "",
    inquiry_type: "",
    attachment: null,
    description: "",
  });

  const fetchTicketTypes = async () => {
    try {
      const { data, error } = await supabase
        .from("lookups")
        .select("*")
        .eq("category", "ticket_type")
        .order("label", { ascending: true });

      if (error) throw error;

      // Format to match your <Select /> options if needed
      const formatted = data.map((i) => ({
        label: i.label,
        value: i.value,
      }));

      setOptions({ ticketTypes: formatted });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load ticket types");
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const uploadTicketAttachment = async (file) => {
    if (!file) return null;

    // If already string path (editing mode)
    if (typeof file === "string") return file;

    // Public upload allowed — use normal client
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = fileName;

    const { error } = await supabase.storage
      .from("ticket_attachments")
      .upload(filePath, file);

    if (error) throw error;

    return filePath; // return path only
  };

  const handleSubmitTicket = async () => {
    if (isSubmitting) return;

    // ✅ Validate BEFORE showing loading toast
    if (
      !form.username.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.subject.trim() ||
      !form.inquiry_type ||
      !form.description.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const loadingToast = toast.loading("Submitting your ticket...");

    try {
      setIsSubmitting(true);

      // ✅ Upload attachment
      const attachmentPath = await uploadTicketAttachment(form.attachment);

      // ✅ Insert ticket
      const { error } = await supabase.from("tickets").insert({
        type: form.inquiry_type,
        subject: form.subject.trim(),
        description: form.description.trim(),
        attachment_url: attachmentPath || null,
        username: form.username,
        email: form.email,
        phone: form.phone,
        status: "Open",
      });

      if (error) throw error;

      toast.dismiss(loadingToast);
      toast.success("Ticket submitted successfully!");

      setForm({
        username: "",
        email: "",
        phone: "",
        subject: "",
        inquiry_type: "",
        attachment: null,
        description: "",
      });
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to submit ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchTicketTypes();
  }, []);

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-green-50 p-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-700">Contact Support</h2>
          <p className="text-gray-600 text-sm mt-1">
            Submit a ticket and our support team will get back to you.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md space-y-5 ">
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter name"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              required
            />
            <Input
              label="Email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            />
          </div>

          {/* Row 2: Phone + Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone"
              placeholder="Enter phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              type="number"
            />
            <Input
              label="Subject"
              placeholder="Enter subject"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              required
            />
          </div>

          {/* Row 3: Inquiry Type + Attachment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Inquiry Type"
              placeholder="Select inquiry type"
              options={options.ticketTypes}
              value={form.inquiry_type}
              onChange={(val) => handleChange("inquiry_type", val)}
              required
            />

            <FileUploader
              label="Attachment"
              value={form.attachment}
              onChange={(file) => handleChange("attachment", file)}
              tooltipText="Attach any relevant document, screenshot, or file that can help our support team better understand your inquiry. Accepted formats: PDF, JPG, or PNG (max 10MB)."
            />
          </div>

          {/* Description (full row) */}
          <Textarea
            label="Description"
            placeholder="Explain your issue"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="h-28"
            required
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmitTicket}
            isLoading={isSubmitting}
            loadingText="Submitting..."
            className="w-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-7 py-3 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
            disabled={isSubmitting}
          >
            Submit Ticket
          </Button>
        </div>

        <div className="flex items-center w-full max-w-sm my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm font-medium">
            Need Urgent Help?
          </span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Link to support FAQ page maybe */}
        <p className=" text-sm text-gray-700">
          Talk with the AI Bot{" "}
          <span
            className="text-green-600 font-medium cursor-pointer underline"
            onClick={() => {
              toast.info("Live Chat is Coming Soon!");
            }}
          >
            Live Chat
          </span>
        </p>
      </div>
    </div>
  );
}
