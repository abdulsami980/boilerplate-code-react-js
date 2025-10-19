import { GREEN_COLOR } from "@/config";
import { SyncLoader } from "react-spinners";

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <SyncLoader color={GREEN_COLOR} size={12} speedMultiplier={1.2} />
      <span className="text-gray-700 text-lg font-medium">Loading…</span>
    </div>
  );
}
