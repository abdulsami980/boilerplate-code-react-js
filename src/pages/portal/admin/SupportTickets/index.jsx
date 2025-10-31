import InlineLoader, { PageLoader } from "@/components/ui/Loaders";
import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Flame,
  Folder,
  Layers,
  Mail,
  MessageSquare,
  Play,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("LOADING", setSearchLoading, searchQuery);

  // ✅ Static ticket data
  const staticTickets = [
    {
      ticket_number: "TCKT-1001",
      subject: "Dashboard not loading properly",
      type: "System Bug",
      category: "Performance",
      status: "Open",
      is_urgent: true,
      assigned_to_name: "Ahmed Raza",
      response_count: 3,
      created_at: "2025-10-25 10:30 AM",
      attachment_url: "https://example.com/screenshot1.png",
    },
    {
      ticket_number: "TCKT-1002",
      subject: "Unable to reset password",
      type: "User Issue",
      category: "Authentication",
      status: "In Progress",
      is_urgent: false,
      assigned_to_name: "Bilal Khan",
      response_count: 5,
      created_at: "2025-10-26 02:20 PM",
      attachment_url: null,
    },
    {
      ticket_number: "TCKT-1003",
      subject: "Email notifications not received",
      type: "Bug",
      category: "Email Service",
      status: "Resolved",
      is_urgent: false,
      assigned_to_name: "Ahmed Raza",
      response_count: 2,
      created_at: "2025-10-27 11:15 AM",
      attachment_url: null,
    },
    {
      ticket_number: "TCKT-1004",
      subject: "Upload failed for patient records",
      type: "System Error",
      category: "File Uploads",
      status: "In Progress",
      is_urgent: true,
      assigned_to_name: "Sara Malik",
      response_count: 7,
      created_at: "2025-10-28 09:50 AM",
      attachment_url: "https://example.com/error-log.pdf",
    },
    {
      ticket_number: "TCKT-1005",
      subject: "Slow response from database",
      type: "Backend",
      category: "Database",
      status: "Open",
      is_urgent: true,
      assigned_to_name: "IT Admin - Junaid",
      response_count: 1,
      created_at: "2025-10-29 08:40 AM",
      attachment_url: null,
    },
  ];

  // ✅ Actions
  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: (r) => toast.success(`Viewing ${r.id}`),
      showIf: true, // always visible
    },
    {
      label: "Mark as In Progress",
      icon: Play,
      color: "amber",
      onClick: (r) => {
        // replace with your real updater (setTickets / API call)
        toast.success(`Ticket ${r.id} marked In Progress`);
      },
      // shown when ticket is Open OR when ticket is Resolved (to reopen)
      showIf: (r) => r.status === "Open" || r.status === "Resolved",
    },
    {
      label: "Mark as Resolved",
      icon: CheckCircle,
      color: "blue",
      onClick: (r) => {
        // replace with your real updater (setTickets / API call)
        toast.success(`Ticket ${r.id} marked Resolved`);
      },
      // shown only when ticket is In Progress
      showIf: (r) => r.status === "In Progress",
    },
    {
      label: "Mark as Urgent",
      icon: Flame,
      color: "blue",
      onClick: (r) => {
        toast.success(`Ticket ${r.id} marked Urgent`);
      },
      showIf: (r) =>
        !r.is_urgent && (r.status === "Open" || r.status === "In Progress"),
    },
  ];

  // ✅ Columns
  const columns = [
    {
      header: "Ticket #",
      accessor: "ticket_number",
      icon: MessageSquare,
      size: "140px",
    },
    { header: "Subject", accessor: "subject", icon: Mail, size: "240px" },
    { header: "Category", accessor: "category", icon: Folder, size: "160px" },
    { header: "Type", accessor: "type", icon: Layers, size: "140px" },

    {
      header: "Status",
      accessor: "status",
      icon: CheckCircle,
      size: "160px",
    },
    {
      header: "Assigned To",
      accessor: "assigned_to_name",
      icon: User,
      size: "180px",
    },
    {
      header: "Urgent",
      accessor: "is_urgent",
      icon: Flame,
      size: "120px",
      render: (row) =>
        row.is_urgent ? (
          <span className="flex items-center text-red-600 font-medium">
            <Flame size={16} className="mr-2 text-red-500" /> Yes
          </span>
        ) : (
          <span className="flex items-center text-slate-500 font-medium">
            No
          </span>
        ),
    },

    {
      header: "Created At",
      accessor: "created_at",
      icon: Clock,
      size: "160px",
    },
  ];

  // ✅ Cards
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  const cards = [
    {
      title: "Total Tickets",
      value: total,
      meta: `${resolved} resolved`,
      icon: <MessageSquare size={22} />,
    },
    {
      title: "Open Tickets",
      value: open,
      meta: `${inProgress} in progress`,
      icon: <AlertCircle size={22} />,
    },
    {
      title: "In Progress",
      value: inProgress,
      meta: `${resolved} resolved`,
      icon: <Clock size={22} />,
    },
    {
      title: "Resolved Tickets",
      value: resolved,
      meta: `${open} open`,
      icon: <CheckCircle size={22} />,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTickets(staticTickets);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-8">
      <TopCards cards={cards} />

      <ToolBar
        title="IT Support Tickets"
        subtitle="View and manage technical support requests."
        showSearch={true}
        onSearch={(query) => setSearchQuery(query)}
      >
        {searchLoading ? (
          <InlineLoader text="Filtering tickets..." />
        ) : (
          <Table
            columns={columns}
            data={tickets}
            actions={actions}
            pageSize={10}
          />
        )}
      </ToolBar>
    </div>
  );
}
