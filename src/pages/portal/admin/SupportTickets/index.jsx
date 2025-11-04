import InlineLoader, { PageLoader } from "@/components/ui/Loaders";
import Table from "@/components/ui/table";
import ToolBar from "@/components/ui/toolbar";
import TopCards from "@/components/ui/topCards";
import { GREEN_COLOR, LEGAL_CONTENT } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase-client";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  Play,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import TicketDetailsDialog from "./TicketDetailsModal";
import LegalModal from "@/components/ui/LegalModal";

export default function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 600);

  const fetchTickets = async (searchText = "") => {
    try {
      if (searchText.trim()) setSearchLoading(true);
      else setLoading(true);

      let query = supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchText.trim()) {
        const q = searchText.trim();
        query = query.or(
          `subject.ilike.%${q}%,email.ilike.%${q}%,username.ilike.%${q}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;

      setTickets(data || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setViewOpen(true);
  };

  const handleStatusUpdate = async (rowId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change ticket status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      confirmButtonColor: GREEN_COLOR,
    });

    if (!result.isConfirmed) return;

    try {
      setTickets((prev) =>
        prev.map((t) => (t.id === rowId ? { ...t, status: newStatus } : t))
      );

      const { error } = await supabase
        .from("tickets")
        .update({
          status: newStatus,
          last_activity_at: new Date().toISOString(),
        })
        .eq("id", rowId);

      if (error) throw error;

      toast.success(`Ticket updated to "${newStatus}"`);
    } catch {
      toast.error("Failed to update ticket");
      fetchTickets();
    }
  };

  const actions = [
    {
      label: "View Details",
      icon: Eye,
      color: "green",
      onClick: (r) => handleViewDetails(r),
    },
    {
      label: "Mark as In Progress",
      icon: Play,
      color: "amber",
      onClick: (r) => handleStatusUpdate(r.id, "In Progress"),
      showIf: (r) => r.status === "Open",
    },
    {
      label: "Mark as Resolved",
      icon: CheckCircle,
      color: "blue",
      onClick: (r) => handleStatusUpdate(r.id, "Resolved"),
      showIf: (r) => r.status === "In Progress",
    },
    {
      label: "Mark as Open",
      icon: CheckCircle,
      color: "blue",
      onClick: (r) => handleStatusUpdate(r.id, "Open"),
      showIf: (r) => r.status === "Resolved",
    },
  ];

  const columns = [
    {
      header: "Ticket #",
      accessor: "ticket_number",
      icon: MessageSquare,
      size: "160px",
    },
    { header: "Username", accessor: "username", icon: User, size: "180px" },
    { header: "Email", accessor: "email", icon: Mail, size: "240px" },
    { header: "Phone", accessor: "phone", icon: Phone, size: "140px" },
    { header: "Status", accessor: "status", icon: CheckCircle, size: "180px" },
    { header: "Type", accessor: "type", icon: Layers, size: "180px" },
    {
      header: "Created At",
      accessor: "created_at",
      icon: Clock,
      size: "200px",
      render: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",
    },
  ];

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
    fetchTickets(debouncedSearch);
  }, [debouncedSearch]);

  if (loading) return <PageLoader />;

  return (
    <>
      <div className="space-y-8">
        <TopCards cards={cards} />

        <ToolBar
          title="Support Tickets"
          subtitle="View and manage support requests."
          showSearch={true}
          onSearch={(q) => setSearchQuery(q)}
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

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedTicket(null);
        }}
      />
    </>
  );
}
