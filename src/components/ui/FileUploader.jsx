import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // ✅ Import toast

const FileUploader = forwardRef(
  (
    {
      label,
      onChange,
      required = false,
      error,
      accept = ".pdf,.jpeg,.jpg,.png",
      className,
      maxSizeMB = 10, // ✅ Default 10MB
    },
    ref
  ) => {
    const [fileError, setFileError] = useState("");

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        const message = `File size must be less than ${maxSizeMB} MB`;
        setFileError(message);
        toast.error(message); // ✅ Show toast alert
        e.target.value = "";
        return;
      }

      setFileError("");
      onChange(file);
      toast.success("File uploaded successfully!"); // ✅ Optional success toast
    };

    return (
      <div className="flex flex-col">
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type="file"
          accept={accept}
          ref={ref}
          onChange={handleFileChange}
          className={cn(
            "flex h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400 file:bg-green-100 file:text-green-600 file:border-0 file:rounded-md file:px-3 file:py-1 file:font-semibold file:hover:bg-green-100 file:cursor-pointer",
            (error || fileError) && "border-red-500",
            className
          )}
        />
        {(error || fileError) && (
          <p className="text-red-500 text-xs mt-1">{fileError || error}</p>
        )}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";

export { FileUploader };
