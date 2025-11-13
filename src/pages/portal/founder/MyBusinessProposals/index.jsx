import IMAGES from "@/assets/images";
import BusinessProposalCard from "@/components/ui/businessProposalCard";
import Tabs from "@/components/ui/Tabs";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import {
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileTextIcon,
  Plus,
  XCircle,
} from "lucide-react";

const pActions = [
  {
    label: "View Details",
    icon: Eye,
    onClick: (data) => console.log("View", data),
  },
  {
    label: "Approve",
    icon: CheckCircle,
    onClick: (data) => console.log("Approve", data),
    isShow: (data) => data.status === "under_review",
  },
  {
    label: "Reject",
    icon: XCircle,
    onClick: (data) => console.log("Reject", data),
    isShow: (data) => data.status === "under_review",
  },
  {
    label: "Request Change",
    icon: Edit,
    onClick: (data) => console.log("Chat with founder", data),
  },
];

const pList = [
  {
    coverImage: IMAGES.AKHTAR,
    title: "AI Medical Assistant",
    subtitle: "A voice-enabled AI health consultant for remote diagnosis.",
    tags: ["AI", "Healthcare"],
    funding: "$150k",
    mvpReady: true,
    submittedAt: "Jan 10, 2025",
    status: "approved",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "GreenBox Packaging",
    subtitle: "Eco-friendly alternative to plastic food containers.",
    tags: ["Sustainability", "Packaging"],
    funding: "$80k",
    mvpReady: false,
    submittedAt: "Jan 12, 2025",
    status: "under_review",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "EduVerse VR",
    subtitle: "Immersive VR learning environments for universities.",
    tags: ["VR", "EdTech"],
    funding: "$220k",
    mvpReady: true,
    submittedAt: "Jan 05, 2025",
    status: "rejected",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "SolarCharge Bikes",
    subtitle: "Solar-powered charging stations for electric bikes.",
    tags: ["Energy", "Mobility"],
    funding: "$60k",
    mvpReady: false,
    submittedAt: "Jan 18, 2025",
    status: "under_review",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "FarmAI Assistant",
    subtitle: "Crop disease detection using AI camera systems.",
    tags: ["Agritech", "AI"],
    funding: "$120k",
    mvpReady: true,
    submittedAt: "Jan 01, 2025",
    status: "approved",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "ShopMate",
    subtitle: "AI personal shopping assistant for e-commerce.",
    tags: ["AI", "E-Commerce"],
    funding: "$90k",
    mvpReady: false,
    submittedAt: "Jan 09, 2025",
    status: "under_review",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "DriveSafe AI",
    subtitle: "AI dashcam for detecting distracted driving.",
    tags: ["AI", "Automotive"],
    funding: "$300k",
    mvpReady: true,
    submittedAt: "Dec 30, 2024",
    status: "approved",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "FreshBox D2C",
    subtitle: "Smart delivery boxes for perishable groceries.",
    tags: ["IoT", "FoodTech"],
    funding: "$110k",
    mvpReady: false,
    submittedAt: "Jan 14, 2025",
    status: "rejected",
  },
  {
    coverImage: IMAGES.AKHTAR,
    title: "ScanPay Lite",
    subtitle: "Offline QR payments for emerging markets.",
    tags: ["FinTech", "QR Payments"],
    funding: "$175k",
    mvpReady: true,
    submittedAt: "Jan 07, 2025",
    status: "approved",
  },
];

export default function MyBusinessProposals() {
  const cards = [
    {
      title: "Total Proposals",
      value: 42,
      meta: "8 new this week",
      icon: <FileTextIcon size={22} />,
    },
    {
      title: "Active Proposals",
      value: 18,
      meta: "24 pending review",
      icon: <CheckCircle size={22} />,
    },

    {
      title: "Pending Review",
      value: 14,
      meta: "Awaiting admin action",
      icon: <Clock size={22} />,
    },
    {
      title: "Rejected Proposals",
      value: 10,
      meta: "12 Changes Requested",
      icon: <XCircle size={22} />,
    },
  ];

  // Define your tabs dynamically
  const tabsData = [
    {
      label: "Under Review",
      value: "under_review",
      count: pList.filter((p) => p.status === "under_review").length,
      content: (
        <BusinessProposalCard
          data={pList.filter((p) => p.status === "under_review")}
          actions={pActions}
        />
      ),
    },
    {
      label: "Approved",
      value: "approved",
      count: pList.filter((p) => p.status === "approved").length,
      content: (
        <BusinessProposalCard
          data={pList.filter((p) => p.status === "approved")}
          actions={pActions}
        />
      ),
    },
    {
      label: "Rejected",
      value: "rejected",
      count: pList.filter((p) => p.status === "rejected").length,
      content: (
        <BusinessProposalCard
          data={pList.filter((p) => p.status === "rejected")}
          actions={pActions}
        />
      ),
    },
  ];

  // ─── Render ────────────────────────────────────────────────
  return (
    <>
      <div className="space-y-8">
        {/* Top cards */}
        <TopCards cards={cards} />

        {/* Founders Table */}
        <ToolBar
          title="Business Proposals"
          subtitle="Manage and post all of your business proposals here."
          showSearch={true}
          onSearch={() => {}}
          extraButton={{
            text: (
              <span className="flex items-center gap-2">
                <Plus size={16} /> Add New Proposal
              </span>
            ),
            onClick: () => alert("Clicked!"),
          }}
        >
          <Tabs tabs={tabsData} />
        </ToolBar>
      </div>
    </>
  );
}
