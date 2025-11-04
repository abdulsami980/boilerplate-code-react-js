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
  CONTACT_SUPPORT: "/contact-support",

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
Meer Group – Business Hub  
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
Meer Group – Business Hub  
<span class="block text-xs">Connecting Vision with Investment</span>
</p
`;
