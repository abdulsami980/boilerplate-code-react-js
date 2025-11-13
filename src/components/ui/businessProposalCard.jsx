import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Clock, X } from "lucide-react";

export default function BusinessProposalCard({ data, actions = [] }) {
  if (Array.isArray(data)) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {data.map((item, i) => (
          <BusinessProposalCard key={i} data={item} actions={actions} />
        ))}
      </div>
    );
  }

  const {
    coverImage,
    title,
    subtitle,
    tags = [],
    funding,
    mvpReady,
    submittedAt,
    status,
  } = data || {};

  const statusConfig = {
    approved: {
      icon: <Check className="w-4 h-4 text-emerald-600" />,
      text: "Approved",
      bg: "bg-emerald-100/70",
      textColor: "text-emerald-700",
    },
    under_review: {
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
      text: "Under Review",
      bg: "bg-yellow-100/70",
      textColor: "text-yellow-700",
    },
    rejected: {
      icon: <Clock className="w-4 h-4 text-red-600" />,
      text: "Rejected",
      bg: "bg-red-100/70",
      textColor: "text-red-700",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card
      className={cn(
        "rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300",
        "bg-white hover:border-emerald-200 hover:scale-[1.02]"
      )}
    >
      {coverImage && (
        <div className="w-full h-44 bg-gray-100 overflow-hidden relative">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 "
          />
          {currentStatus && (
            <div
              className={cn(
                "absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm",
                currentStatus.bg,
                currentStatus.textColor
              )}
            >
              {currentStatus.icon}
              {currentStatus.text}
            </div>
          )}
        </div>
      )}

      <CardContent className="p-6 pb-4 space-y-3">
        {/* Title + Subtitle */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 leading-snug tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-snug">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="text-xs bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-100 font-medium shadow-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-gray-200" />

        {/* Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <p className="font-semibold">Funding</p>
            <span className="font-semibold text-gray-900">{funding}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <p className="font-semibold">MVP Ready</p>
            <span className="font-semibold text-gray-900">
              {mvpReady ? (
                <Check className="w-5 h-5 text-emerald-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <p className="font-semibold">Submitted</p>
            <span className="font-semibold text-gray-900">{submittedAt}</span>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gray-200" />

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            {actions
              .filter((a) => !a.isShow || a.isShow(data))
              .map((action, i) => (
                <button
                  key={i}
                  onClick={() => action.onClick(data)}
                  className="relative group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-emerald-200 bg-emerald-100 hover:bg-emerald-200 hover:border-emerald-300 transition-all">
                    <action.icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-all" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-gray-600 text-white text-[11px] opacity-0 pointer-events-none group-hover:opacity-100 scale-95 group-hover:scale-100 transition whitespace-nowrap">
                    {action.label}
                  </div>
                </button>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
