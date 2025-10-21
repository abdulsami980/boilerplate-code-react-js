import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    if (!raw) return { name: "Guest", email: "N/A" };

    const parsed = JSON.parse(raw);

    const name = parsed?.user?.user_metadata?.full_name || "Guest";
    const email = parsed?.user?.email || "N/A";

    return { name, email };
  } catch (err) {
    console.error("Error reading user info from localStorage:", err);
    return { name: "Guest", email: "N/A" };
  }
};
