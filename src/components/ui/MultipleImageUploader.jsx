import { useState, useEffect, useRef } from "react";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

export default function MultipleImageUploader({
  label,
  value = [],
  onChange,
  required = false,
  maxSizeMB = 5,
  maxImages = 5,
}) {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  // Update previews whenever value changes
  useEffect(() => {
    const newPreviews = value.map((fileOrUrl) => {
      if (typeof fileOrUrl === "string") return fileOrUrl;
      return URL.createObjectURL(fileOrUrl);
    });

    setPreviews(newPreviews);

    // Cleanup object URLs on unmount
    return () => {
      newPreviews.forEach((url, idx) => {
        if (typeof value[idx] !== "string") URL.revokeObjectURL(url);
      });
    };
  }, [value]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate each file
    for (let file of files) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        toast.error(`Each image must be smaller than ${maxSizeMB} MB`);
        return;
      }
    }

    const combined = [...value, ...files];
    if (combined.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    onChange(combined);
  };

  const handleRemove = (index) => {
    const newFiles = value.filter((_, idx) => idx !== index);
    onChange(newFiles);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const triggerReplace = (index) => {
    // Store the index in ref
    fileInputRef.current.dataset.replaceIndex = index;
    triggerFileSelect();
  };

  const handleReplace = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`Image must be smaller than ${maxSizeMB} MB`);
      e.target.value = "";
      return;
    }

    const replaceIndex = Number(e.target.dataset.replaceIndex);
    const newFiles = [...value];
    newFiles[replaceIndex] = file;
    onChange(newFiles);
    e.target.value = "";
    delete e.target.dataset.replaceIndex;
  };

  return (
    <>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-wrap gap-4 mt-2">
        {previews.map((src, idx) => (
          <div
            key={idx}
            className="relative w-40 h-40 border-2 border-dashed border-green-400 rounded-xl overflow-hidden bg-green-50 hover:bg-green-100 flex items-center justify-center shadow-sm"
          >
            <img
              src={src}
              alt={`Preview ${idx}`}
              className="w-full h-full object-cover"
            />

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md z-20 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {/* Replace Button */}
            <button
              type="button"
              onClick={() => triggerReplace(idx)}
              className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 shadow-md z-20 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        ))}

        {/* Add New Image */}
        {previews.length < maxImages && (
          <div
            onClick={triggerFileSelect}
            className="relative w-40 h-40 border-2 border-dashed border-green-400 rounded-xl overflow-hidden cursor-pointer bg-green-50 hover:bg-green-100 flex items-center justify-center shadow-sm"
          >
            <div className="flex flex-col items-center justify-center text-green-600">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Click to upload</span>
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp"
        ref={fileInputRef}
        onChange={(e) =>
          e.target.dataset.replaceIndex ? handleReplace(e) : handleFileChange(e)
        }
        className="hidden"
      />
    </>
  );
}
