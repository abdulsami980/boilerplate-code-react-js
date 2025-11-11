import { forwardRef, useState, useEffect, useRef } from "react";
import { Eye, Link, Trash2, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FileUploader = forwardRef(
  (
    {
      label,
      value,
      onChange,
      required = false,
      error,
      accept = ".pdf,.jpeg,.jpg,.png",
      className,
      maxSizeMB = 10,
      placeholder = "Upload file...",
      tooltipText, // 👈 new prop
    },
    ref
  ) => {
    const [fileError, setFileError] = useState("");
    const [isFile, setIsFile] = useState(false);
    const internalRef = useRef(null);
    const inputRef = ref || internalRef; // use forwarded ref if provided

    useEffect(() => {
      setIsFile(value instanceof File);
    }, [value]);

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        const message = `File size must be less than ${maxSizeMB} MB`;
        setFileError(message);
        toast.error(message);
        e.target.value = "";
        return;
      }

      setFileError("");
      onChange(file);
      toast.success("File uploaded successfully!");
    };

    const handleRemove = () => {
      onChange(null);
      if (inputRef.current) inputRef.current.value = "";
    };

    const getFileName = () => {
      if (isFile && value instanceof File) return value.name;
      if (!isFile && typeof value === "string") {
        try {
          const raw = value.split("/").pop().split("?")[0];
          return decodeURIComponent(raw);
        } catch {
          return value.split("/").pop().split("?")[0];
        }
      }
      return "";
    };

    const handleView = () => {
      if (!value) return;
      const url = isFile ? URL.createObjectURL(value) : value;
      window.open(url, "_blank");
    };

    const filename = getFileName();

    return (
      <div className="flex flex-col">
        {label && (
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              {label}{" "}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            {/* Tooltip icon (conditionally shown) */}
            {tooltipText && (
              <div className="relative group flex items-center">
                <CircleHelp
                  size={16}
                  className="text-gray-400 hover:text-green-600 cursor-pointer transition-colors"
                />
                <div
                  className="
                    absolute right-0 top-6 z-20 hidden w-56 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white 
                    shadow-lg group-hover:block transition-all duration-200
                  "
                >
                  {tooltipText}
                  <div className="absolute right-2 -top-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            "relative flex items-center justify-between h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm",
            (error || fileError) && "border-red-500",
            className
          )}
        >
          <span
            className="text-gray-600 flex-1 min-w-0 truncate mr-3"
            title={filename || placeholder}
          >
            {filename ? filename : placeholder}
          </span>

          {!value && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-green-100 hover:bg-green-200 px-2 py-1 rounded text-sm font-semibold text-green-600 flex items-center hover:cursor-pointer"
            >
              <Link size={14} className="mr-2 text-green-600" />
              Attach
            </button>
          )}

          {value && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleView}
                className="text-green-600 hover:text-green-700 hover:cursor-pointer"
                title="View file"
              >
                <Eye className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                title="Remove file"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}

          <input
            type="file"
            accept={accept}
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {(error || fileError) && (
          <p className="text-red-500 text-xs mt-1">{fileError || error}</p>
        )}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";

export { FileUploader };
