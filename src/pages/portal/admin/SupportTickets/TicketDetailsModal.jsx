import { memo, useMemo } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";

const TicketDetailsDialog = memo(({ ticket, open, onClose }) => {
  // Precompute status classes (hook must be called unconditionally)
  const statusClass = useMemo(() => {
    switch (ticket?.status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-blue-100 text-blue-700";
      case "Closed":
        return "bg-gray-200 text-gray-700";
      default:
        return "";
    }
  }, [ticket?.status]);

  if (!ticket) return null;

  return (
    <Dialog show={open} onHide={onClose} headerTitle="Ticket Details" size="lg">
      <div className="space-y-6">
        {/* Top Info Section */}
        <div className="grid grid-cols-2 gap-4 text-sm m-0">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-medium">Ticket #:</span>
            <span className="text-gray-800">{ticket.ticket_number}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-medium">Status:</span>
            <span
              className={cn(
                "inline-flex px-2 py-1 rounded text-xs font-medium w-fit",
                statusClass
              )}
            >
              {ticket.status}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-medium">Type:</span>
            <span className="text-gray-800">{ticket.type}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-medium">Email:</span>
            <span className="text-gray-800 break-all">{ticket.email}</span>
          </div>

          {ticket.phone && (
            <div className="flex flex-col col-span-2">
              <span className="text-gray-500 text-xs font-medium">Phone:</span>
              <span className="text-gray-800 break-all">{ticket.phone}</span>
            </div>
          )}

          <div className="flex flex-col col-span-2">
            <span className="text-gray-500 text-xs font-medium">Subject:</span>
            <span className="text-gray-800">{ticket.subject}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3" />

        {/* Description */}
        <div className="text-sm">
          <span className="text-gray-500 text-xs font-medium block mb-1">
            Description:
          </span>
          <p className="text-gray-800 whitespace-pre-line leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
            {ticket.description}
          </p>
        </div>

        {/* Attachment */}
        {ticket.attachment_url && (
          <div className="flex gap-4 items-center">
            <span className="text-gray-500 text-xs font-medium block">
              Attachment:
            </span>
            <a
              href={ticket.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-500 hover:text-green-700 hover:underline mt-1 text-sm"
            >
              <Link size={16} /> View File
            </a>
          </div>
        )}
      </div>
    </Dialog>
  );
});

export default TicketDetailsDialog;
