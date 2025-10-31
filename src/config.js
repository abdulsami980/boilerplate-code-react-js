export const GREEN_COLOR = "#22c55e"; // Tailwind green-500

export const PATH = {
  // =====================
  // LANDING PAGE
  // =====================
  LANDING: "/",

  // =====================
  // AUTHENTICATION
  // =====================
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  VERIFY_USER_EMAIL: "/verify-user-email",
  FORGOT_PASSWORD: "/forgot-password",

  // =====================
  // ADMIN
  // =====================
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    INVESTORS: "/admin/investors",
    EDIT_INVESTOR: {
      PATTERN: "/admin/investors/edit/:id",
      TO: (id) => `/admin/investors/edit/${id}`,
    },
    VIEW_INVESTOR: {
      PATTERN: "/admin/investors/view/:id",
      TO: (id) => `/admin/investors/view/${id}`,
    },
    FOUNDERS: "/admin/founders",
    VIEW_FOUNDER: {
      PATTERN: "/admin/founders/view/:id",
      TO: (id) => `/admin/founders/view/${id}`,
    },
    EDIT_FOUNDER: {
      PATTERN: "/admin/founders/edit/:id",
      TO: (id) => `/admin/founders/edit/${id}`,
    },

    SUPPORT_TICKETS: "/admin/support-tickets",
    PROFILE: "/admin/profile",
    SETTINGS: "/admin/settings",
    HELP: "/admin/help",
  },

  // =====================
  // INVESTOR
  // =====================
  INVESTOR: {
    DASHBOARD: "/investor/dashboard",
    PROFILE: "/investor/profile",
    SETTINGS: "/investor/settings",
    HELP: "/investor/help",
  },

  // =====================
  // FOUNDER
  // =====================
  FOUNDER: {
    DASHBOARD: "/founder/dashboard",
    PROFILE: "/founder/profile",
    SETTINGS: "/founder/settings",
    HELP: "/founder/help",
  },
};
