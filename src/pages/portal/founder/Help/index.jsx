import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUploader } from "@/components/ui/FileUploader";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { getLookupOptions, getUserInfo } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import Hls from "hls.js";
import {
  Globe,
  Loader2,
  Play,
  Rocket,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function FounderHelpScreen() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    inquiry_type: "",
    attachment: null,
    description: "",
  });

  const options = {
    ticketTypes: getLookupOptions("ticket_type"),
  };

  const videoSrc = import.meta.env.VITE_MAIN_VIDEO_UTL;

  const uploadTicketAttachment = async (file) => {
    if (!file) return null;

    // If string path already exists (editing mode), return it
    if (typeof file === "string") {
      return file;
    }

    // ✅ Get token to upload private file
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) throw new Error("Not authenticated");

    // ✅ Create Supabase client with auth header for protected uploads
    const supabaseAuth = createClient(
      import.meta.env.VITE_SUPA_BASE_PROJECT_URL,
      import.meta.env.VITE_SUPA_BASE_API_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    // ✅ File path — NO folder, only root of `tickets` bucket
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${fileName}`;

    const { error } = await supabaseAuth.storage
      .from("ticket_attachments")
      .upload(filePath, file);

    if (error) throw error;

    // return path — NOT public URL
    return filePath;
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitTicket = async () => {
    if (isSubmitting) return;
    const loadingToast = toast.loading("Submitting your ticket...");

    try {
      const { name, email, phone } = getUserInfo();

      if (
        !form.subject.trim() ||
        !form.inquiry_type ||
        !form.description.trim()
      ) {
        toast.error("Please fill all required fields.");
        return;
      }

      setIsSubmitting(true);

      // ✅ Upload attachment
      const attachmentPath = await uploadTicketAttachment(form.attachment);

      // ✅ Insert ticket
      const { error } = await supabase.from("tickets").insert({
        type: form.inquiry_type,
        subject: form.subject.trim(),
        description: form.description.trim(),
        attachment_url: attachmentPath || null,
        username: name,
        email: email,
        phone: phone,
        status: "Open",
      });

      if (error) throw error;

      toast.dismiss(loadingToast);
      toast.success("Ticket submitted successfully!");

      setForm({
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

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, () => setIsLoading(false));

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadeddata", () => setIsLoading(false));
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [videoSrc]);

  return (
    <>
      <section className="w-full flex flex-col items-center text-center py-10  px-6 md:px-12 lg:px-24">
        {/* Heading */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 tracking-tight">
            Unlocking Pakistan’s Multi-Billion Dollar Potential
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
            A revolutionary ecosystem empowering entrepreneurs, investors, and
            innovators to collaborate — driving sustainable growth, global
            visibility, and a brighter economic future for Pakistan.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200/20 group hover:scale-[1.01] transition-all duration-500">
          <video
            ref={videoRef}
            onClick={togglePlay}
            onEnded={handleEnded}
            className="w-full h-full object-cover cursor-pointer"
            playsInline
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
            </div>
          )}
          {!isPlaying && !isLoading && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Play className="w-10 h-10 text-green-400" />
              </div>
            </button>
          )}
        </div>

        {/* Step-by-Step Grid */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 w-full max-w-6xl text-left">
          {[
            {
              icon: Rocket,
              title: "Join the Business Hub",
              desc: "Create your founder profile and connect with investors, mentors, and a trusted ecosystem to scale your startup efficiently.",
            },
            {
              icon: Globe,
              title: "Understand the Vision",
              desc: "Part of Vision Pakistan 2030 — empowering entrepreneurship, global investment, and sustainable development across Pakistan.",
            },
            {
              icon: Users,
              title: "Benefits for Founders",
              list: [
                "Direct access to vetted local and international investors.",
                "Strategic partnerships, mentorship, and corporate collaborations.",
                "Global visibility and growth opportunities.",
              ],
            },
            {
              icon: Target,
              title: "Founder Journey",
              list: [
                "Register & complete your profile with company info and documents.",
                "Submit your startup idea with market analysis and pitch deck.",
                "Get shortlisted by investors and engage in discussions.",
                "Secure funding and strategic collaborations safely.",
              ],
            },
            {
              icon: Shield,
              title: "Impact You Make",
              desc: "By participating, you contribute to Pakistan’s entrepreneurial revolution, drive economic growth, and expand your startup’s reach.",
            },
            {
              icon: Star,
              title: "Leadership & Guidance",
              desc: "Led by Shakeel Ahmad Meer — fostering conscious entrepreneurship to create sustainable business growth and national impact.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-green-400/20 shadow-lg backdrop-blur-md bg-green-100 hover:from-white/10 hover:via-green-100/10 hover:to-green-200/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <step.icon className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              {step.desc && (
                <p className="text-gray-600 text-base">{step.desc}</p>
              )}
              {step.list && (
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {step.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-24">
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Tell us what you need assistance with and provide any relevant
              details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Subject"
                placeholder="Enter subject"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                required
              />

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
              />
            </div>

            <div className="md:col-span-2 my-4">
              <Textarea
                label="Description"
                placeholder="Tell us about your inquiry"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSubmitTicket}
                isLoading={isSubmitting}
                loadingText="Submitting Ticket..."
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Submit Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
