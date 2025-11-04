import { Dialog } from "@/components/ui/dialog";
import { memo } from "react";

const LegalModal = memo(
  ({ open, onClose, title = "Terms & Privacy", content }) => {
    return (
      <Dialog show={open} onHide={onClose} headerTitle={title} size="lg">
        <div
          className="prose prose-sm max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Dialog>
    );
  }
);

export default LegalModal;
