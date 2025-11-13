export const GREEN_COLOR = "#22c55e"; // Tailwind green-500
export const MAX_FAILED_ATTEMPTS = 5;
export const SUSPEND_DURATION_MINUTES = 120;

export const PATH = {
  // =====================
  // WEBSITE
  // =====================
  LANDING: "/",
  DATA_DELETION_POLICY: "/data-deletion-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  PRIVACY_POLICY: "/privacy-policy",
  COOKIE_POLICY: "/cookie-policy",

  // =====================
  // AUTHENTICATION
  // =====================
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  VERIFY_USER_EMAIL: "/verify-user-email",
  FORGOT_PASSWORD: "/forgot-password",
  CONTACT_SUPPORT: "/contact-support",
  AUTH_CALLBACK: "/authentication-callback",

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
    MY_BUSINESS_PROPOSALS: "/founder/my-business-proposals",
  },
};

export const LEGAL_CONTENT = `
<h2 class="font-semibold text-base">1. Terms of Reference (TORs)</h2>

<p><strong>Purpose:</strong>  
The Business Hub connects verified investors with credible businesses seeking partnerships, funding, or expansion opportunities.</p>

<p><strong>Scope:</strong>  
Applies to all users including investors, businesses, and affiliates. By registering, you agree to comply with these terms.</p>

<h3 class="mt-4 font-medium">User Responsibilities</h3>
<ul class="list-disc pl-5 space-y-1">
<li>Provide accurate and up-to-date information</li>
<li>Submit required KYC/AML verification documents</li>
<li>Maintain confidentiality of shared business/investment information</li>
<li>Upload lawful and ethical promotional material only</li>
</ul>

<h3 class="mt-4 font-medium">Code of Conduct</h3>
<ul class="list-disc pl-5 space-y-1">
<li>Professional and respectful communication</li>
<li>No misuse of data or false representation</li>
<li>No illegal or unethical activities</li>
</ul>

<h3 class="mt-4 font-medium">Compliance</h3>
<p>The platform follows corporate compliance and AML standards.</p>

<hr class="my-4"/>

<h2 class="font-semibold text-base">2. Privacy Policy</h2>

<h3 class="mt-2 font-medium">Data Collection</h3>
<p>We collect personal and business information for account verification and communication.</p>

<h3 class="mt-2 font-medium">Data Usage</h3>
<ul class="list-disc pl-5 space-y-1">
<li>KYC/AML verification</li>
<li>Business-investor matching</li>
<li>Platform communication</li>
<li>Analytics and improvement</li>
</ul>

<h3 class="mt-2 font-medium">Data Protection</h3>
<ul class="list-disc pl-5 space-y-1">
<li>Secure storage</li>
<li>No selling or unauthorized sharing</li>
<li>Right to request corrections or deletion</li>
</ul>

<h3 class="mt-2 font-medium">Cookies</h3>
<p>Cookies may be used for user experience improvement; they can be disabled in browser settings.</p>

<hr class="my-4"/>

<h2 class="font-semibold text-base">3. Disclaimer</h2>
<ul class="list-disc pl-5 space-y-1">
<li>The platform facilitates connections, not transactions</li>
<li>Users bear their own financial risk & due diligence</li>
<li>We are not liable for user-submitted data or financial loss</li>
<li>Terms may be updated without prior notice</li>
</ul>

<hr class="my-4"/>

<p class="text-center text-gray-600 font-medium mt-6">
Vision 2030 – Business Hub  
<span class="block text-xs">Connecting Vision with Investment</span>
</p>`;

export const NDA_CONTENT = `
<h2 class="font-semibold text-base">Non-Disclosure Agreement (NDA)</h2>

<p>This Non-Disclosure Agreement (“Agreement”) is made between <strong>Meer Group</strong> (Operator of the Business Hub) and the <strong>Registered User</strong> (Investor / Business / Partner), collectively referred to as “the Parties”.</p>

<p>By agreeing to this document, the User confirms that:</p>

<h3 class="mt-4 font-medium">1. Confidential Information</h3>
<p>All business plans, financial details, investment opportunities, project documents, and related data shared through the platform are confidential and proprietary to Meer Group and its partners.</p>

<h3 class="mt-4 font-medium">2. Obligation of Confidentiality</h3>
<p>The User shall not disclose, copy, share, or use any confidential information obtained from the platform for any purpose other than evaluating business or investment opportunities approved by Meer Group.</p>

<h3 class="mt-4 font-medium">3. Ownership</h3>
<p>All shared materials, presentations, images, videos, and business concepts remain the sole property of Meer Group or the respective project owners.</p>

<h3 class="mt-4 font-medium">4. No Unauthorized Contact</h3>
<p>The User agrees not to directly approach, contact, or solicit any party introduced through the Hub without prior written consent from Meer Group.</p>

<h3 class="mt-4 font-medium">5. Duration</h3>
<p>This Agreement remains valid for two (2) years from the date of acceptance, or until the User’s association with the Hub ends — whichever is later.</p>

<h3 class="mt-4 font-medium">6. Governing Law</h3>
<p>This Agreement shall be governed by and interpreted in accordance with the laws of Pakistan.</p>

<hr class="my-4"/>

<p>By accepting this Agreement, you acknowledge that you have read, understood, and agree to abide by its terms and conditions.</p>

<p class="text-center text-gray-600 font-medium mt-6">
Vision 2030 – Business Hub  
<span class="block text-xs">Connecting Vision with Investment</span>
</p
`;

export const COOKIE_POLICY_CONTENT = `
<h2 class="font-semibold text-base">Cookie Policy</h2>

<p>Our platform uses cookies and similar technologies to enhance your browsing experience and provide personalized services. By using the Business Hub, you consent to our use of cookies in accordance with this policy.</p>

<h3 class="mt-4 font-medium">1. What are Cookies?</h3>
<p>Cookies are small text files stored on your device by your web browser that help the platform remember your preferences, login information, and interactions.</p>

<h3 class="mt-4 font-medium">2. Types of Cookies We Use</h3>
<ul class="list-disc pl-5 space-y-1">
<li><strong>Essential Cookies:</strong> Required for core platform functionality, login, and security.</li>
<li><strong>Performance Cookies:</strong> Help us analyze platform usage and improve user experience.</li>
<li><strong>Functional Cookies:</strong> Remember your preferences and settings for convenience.</li>
<li><strong>Advertising Cookies:</strong> Used for marketing purposes and to deliver relevant promotional content.</li>
</ul>

<h3 class="mt-4 font-medium">3. Managing Cookies</h3>
<p>You can manage or disable cookies via your browser settings. Please note that disabling essential cookies may affect the proper functioning of the platform.</p>

<h3 class="mt-4 font-medium">4. Third-Party Cookies</h3>
<p>We may use third-party services such as analytics or marketing providers that set cookies to measure platform performance and deliver relevant content. These are subject to the respective third-party policies.</p>

<h3 class="mt-4 font-medium">5. Updates to This Policy</h3>
<p>We may update this Cookie Policy periodically. Changes will be reflected on this page with the last updated date. Continued use of the platform indicates acceptance of the updated policy.</p>

<hr class="my-4"/>

<p class="text-center text-gray-600 font-medium mt-6">
Vision 2030 – Business Hub  
<span class="block text-xs">Connecting Vision with Investment</span>
</p>
`;
