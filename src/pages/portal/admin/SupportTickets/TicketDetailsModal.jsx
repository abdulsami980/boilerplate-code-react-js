import { memo, useMemo, useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Link } from "lucide-react";
import { cn, getSignedUrl } from "@/lib/utils";

const TicketDetailsDialog = memo(({ ticket, open, onClose }) => {
  const [signedUrl, setSignedUrl] = useState(null);

  const statusClass = useMemo(() => {
    switch (ticket?.status) {
      case "Open":
        return "bg-red-100 text-red-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";

      default:
        return "";
    }
  }, [ticket?.status]);

  const ticketFields = [
    { label: "Name", value: ticket?.username },
    { label: "Email", value: ticket?.email },
    { label: "Phone", value: ticket?.phone },
    {
      label: "Status",
      value: (
        <span
          className={cn(
            "inline-flex px-2 py-1 rounded text-xs font-medium w-fit",
            statusClass
          )}
        >
          {ticket?.status}
        </span>
      ),
    },
    { label: "Ticket #", value: ticket?.ticket_number },
    { label: "Type", value: ticket?.type },
    { label: "Subject", value: ticket?.subject },
  ];

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (ticket?.attachment_url) {
        const url = await getSignedUrl(
          "ticket_attachments",
          ticket?.attachment_url
        );
        setSignedUrl(url);
      } else {
        setSignedUrl(null);
      }
    };

    fetchSignedUrl();
  }, [ticket]);

  const handleViewFile = () => {
    if (!signedUrl) return;
    window.open(signedUrl, "_blank");
  };

  if (!ticket) return null;

  return (
    <Dialog show={open} onHide={onClose} headerTitle="Ticket Details" size="lg">
      <div className="space-y-6">
        {/* Ticket Info */}
        <div className="grid grid-cols-2 gap-4 text-sm m-0">
          {ticketFields.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium">
                {item.label}:
              </span>
              <span className="text-gray-800 break-all">{item.value}</span>
            </div>
          ))}
        </div>

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

            <button
              onClick={handleViewFile}
              disabled={!signedUrl}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 hover:underline mt-1 text-sm disabled:opacity-50 cursor-pointer"
            >
              <Link size={16} /> View File
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
});

export default TicketDetailsDialog;
