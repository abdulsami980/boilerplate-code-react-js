import { useState, useEffect, useRef } from "react";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner"; // ✅ Import toast

export default function ImageUploader({
  label,
  value,
  onChange,
  required = false,
  maxSizeMB = 5, // ✅ Default 5 MB
}) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      // value is already a URL (signed URL)
      setPreview(value);
    } else {
      // value is a File
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`Image must be smaller than ${maxSizeMB} MB`);
      e.target.value = "";
      return;
    }

    onChange(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    setPreview(null);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={triggerFileSelect}
        className="relative w-40 max-w-sm h-40 border-2 border-dashed border-green-400 rounded-xl overflow-hidden cursor-pointer bg-green-50 hover:bg-green-100 transition-shadow mt-2 shadow-sm hover:shadow-lg flex items-center justify-center"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-full p-2 shadow-md z-20"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {/* Re-upload Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileSelect();
              }}
              className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white rounded-full p-2 shadow-md z-20"
            >
              <Upload className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-green-600">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Click to upload</span>
          </div>
        )}

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </>
  );
}
