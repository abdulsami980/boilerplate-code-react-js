import { Dialog } from "@/components/ui/dialog";
import { DownloadIcon } from "lucide-react";
import { memo } from "react";

const LegalModal = memo(({ open, onClose, title, content }) => {
  // Action to download content as a text file
  const downloadContent = () => {
    const blob = new Blob([content.replace(/<[^>]+>/g, "")], {
      type: "text/plain",
    }); // Remove HTML tags
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const actions = [
    {
      label: "Download",
      onClick: downloadContent,
      icon: <DownloadIcon className="w-4 h-4" />,
    },
  ];

  return (
    <Dialog
      show={open}
      onHide={onClose}
      headerTitle={title}
      size="lg"
      actions={actions}
    >
      <div
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Dialog>
  );
});

export default LegalModal;
