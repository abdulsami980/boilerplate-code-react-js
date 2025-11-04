import { GREEN_COLOR } from "@/config";
import { clsx } from "clsx";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase-client";

export const swalWrapper = ({ message, accept, reject, ...options }) =>
  Swal.fire({
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: GREEN_COLOR,
    cancelButtonColor: null,
    customClass: {
      cancelButton:
        "border-green-500 text-green-500 bg-transparent hover:bg-green-50",
    },
    text: message,
    preConfirm: accept,
    ...options,
  }).then((result) => {
    if (result.isDismissed && reject) {
      reject();
    }
  });

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getUserRole = () => {
  try {
    const raw = localStorage.getItem("sb-saflenzzjxmfqdgkanjp-auth-token");
    if (!raw) return "guest"; // fallback

    const parsed = JSON.parse(raw);
    // role is inside user.user_metadata.role
    return parsed?.user?.user_metadata?.role?.toLowerCase() || "guest";
  } catch (err) {
    console.error("Error reading user role from localStorage:", err);
    return "guest";
  }
};

export const getUserInfo = () => {
  try {
    const raw = localStorage.getItem("sb-saflenzzjxmfqdgkanjp-auth-token");
    if (!raw) return { name: "", email: "", phone: "" };

    const parsed = JSON.parse(raw);

    const name = parsed?.user?.user_metadata?.full_name;
    const email = parsed?.user?.email;
    const phone = parsed?.user?.user_metadata?.phone;
    const id = parsed?.user?.id;

    return { name, email, phone, id };
  } catch (err) {
    console.error("Error reading user info from localStorage:", err);
    return { name: "", email: "", phone: "", id: "" };
  }
};

export const getSignedUrl = async (bucket, filePath) => {
  if (!filePath) return null;

  // ✅ DO NOT encode — Supabase expects raw path
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, 60 * 60); // 1 hour

  if (error) {
    console.error(`❌ Failed to create signed URL for ${filePath}:`, error);
    return null;
  }

  return data.signedUrl;
};

export const getLookupOptions = (category) => {
  try {
    const lookups = JSON.parse(localStorage.getItem("lookups")) || [];

    const filtered = lookups.filter((item) => item.category === category);

    return filtered.map((item) => ({
      value: item.value,
      label: item.label,
    }));
  } catch (error) {
    console.error("Error parsing lookups:", error);
    return [];
  }
};

export const getCountriesOptions = () => {
  try {
    const countries = JSON.parse(localStorage.getItem("countries")) || [];

    return countries.map((country) => ({
      value: country.value,
      label: country.label,
    }));
  } catch (error) {
    console.error("Error parsing countries:", error);
    return [];
  }
};
