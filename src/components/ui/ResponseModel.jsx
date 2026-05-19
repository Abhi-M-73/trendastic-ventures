import React, { useEffect } from "react";
import check from "../../assets/other/check.png";
import cross from "../../assets/other/cross.png";

const THEMES = {
  success: {
    defaultTitle: "Success",
    color: {
      base: "text-green-500",
      dim: "text-emerald-300",
      ringFrom: "from-green-600/80 via-white/50",
      ringTo: "to-green-500/20",
      glow:
        "shadow-[0_0_0_1px_rgba(16,185,129,0.4),0_0_25px_rgba(16,185,129,0.25)]",
      highlight: "text-green-500",
      icon: "#22c55e",
    },
    Icon: () => <img src={check} alt="success" className="w-16 h-16" />,
  },
  error: {
    defaultTitle: "Error",
    color: {
      base: "text-red-600",
      dim: "text-rose-300",
      ringFrom: "from-red-600/80 via-white/50",
      ringTo: "to-red-500/20",
      glow:
        "shadow-[0_0_0_1px_rgba(244,63,94,0.45),0_0_25px_rgba(244,63,94,0.25)]",
      highlight: "text-red-500",
      icon: "#ef4444",
    },
    Icon: () => <img src={cross} alt="error" className="w-16 h-16" />,
  },
  warning: {
    defaultTitle: "Warning",
    color: {
      base: "text-yellow-400",
      dim: "text-amber-200",
      ringFrom: "from-amber-500/80 via-white/50",
      ringTo: "to-amber-400/20",
      glow:
        "shadow-[0_0_0_1px_rgba(245,158,11,0.5),0_0_25px_rgba(245,158,11,0.25)]",
      highlight: "text-yellow-300",
      icon: "#facc15",
    },
    Icon: () => (
      <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center">
        <span className="text-5xl text-yellow-400">!</span>
      </div>
    ),
  },
  confirm: {
    defaultTitle: "Are you sure?",
    color: {
      base: "text-blue-400",
      dim: "text-sky-200",
      ringFrom: "from-sky-500/80 via-white/50",
      ringTo: "to-sky-400/20",
      glow:
        "shadow-[0_0_0_1px_rgba(56,189,248,0.5),0_0_25px_rgba(56,189,248,0.25)]",
      highlight: "text-sky-300",
      icon: "#38bdf8",
    },
    Icon: () => (
      <div className="w-32 h-32 rounded-full border border-sky-400 flex items-center justify-center">
        <span className="text-5xl text-sky-400">?</span>
      </div>
    ),
  },
};

/**
 * Generic Response Modal
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 *
 * - variant: "success" | "error" | "warning" | "confirm"
 * - title?: string                -> custom title (optional)
 * - message?: string              -> simple text message (optional)
 *
 * - rows?: Array<{ label, value, labelClass?, valueClass? }>
 *      -> agar table type info dikhani ho (Invested / Return / Profit / Date / Time)
 *
 * - confirmLabel?: string         -> confirm button ka label (default: "OK")
 * - onConfirm?: () => void        -> confirm button pe call hoga
 *
 * - showCancel?: boolean          -> "Are you sure?" type dialogs ke liye
 * - cancelLabel?: string          -> cancel button label (default: "Cancel")
 */
export default function ResponseModel({
  open,
  onClose,
  variant = "success",
  title,
  message = "",
  rows = [],

  confirmLabel = "OK",
  onConfirm,

  showCancel = false,
  cancelLabel = "Cancel",
}) {
  const T = THEMES[variant] || THEMES.success;

  // ESC, body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev || "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    else if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || T.defaultTitle}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-[90%] max-w-sm p-1 rounded-3xl bg-gradient-to-br ${T.color.ringFrom} ${T.color.ringTo}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card */}
        <div
          className={`relative rounded-3xl ${T.color.glow} bg-black text-white`}
          style={{
            boxShadow:
              "inset 0 -2px 0 rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="px-3 pt-7 pb-6">
            {/* Big Icon */}
            <div className="mt-3 flex justify-center">
              <T.Icon />
            </div>

            {/* Title */}
            <h3
              className={`text-center text-xl font-semibold ${T.color.base}`}
            >
              {title || T.defaultTitle}
            </h3>

            {/* Inner panel */}
            <div className="mt-5 rounded-2xl bg-[#242424] border !border-white/5 p-4">
              {/* Either rows, or simple message */}
              {rows && rows.length > 0 ? (
                <div className="space-y-5">
                  {rows.map((row, idx) => (
                    <React.Fragment key={idx}>
                      <Row
                        label={row.label}
                        value={row.value}
                        valueClass={row.valueClass}
                        labelClass={row.labelClass}
                      />
                      {idx !== rows.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </div>
              ) : message ? (
                <p className="text-center text-md text-white/80 leading-relaxed">
                  {message}
                </p>
              ) : null}

              {/* Buttons */}
              <div
                className={`mt-6 ${
                  showCancel ? "flex gap-3" : ""
                } items-center`}
              >
                {showCancel && (
                  <button
                    onClick={onClose}
                    className="w-1/2 rounded-full text-lg font-semibold text-white/90 bg-white/10 hover:bg-white/15 transition-colors py-2 border border-white/20"
                  >
                    {cancelLabel}
                  </button>
                )}

                <button
                  onClick={handleConfirm}
                  className={`${
                    showCancel ? "w-1/2" : "w-full"
                  } rounded-full text-xl font-semibold text-white relative overflow-hidden common-border3 ${
                    variant === "error"
                      ? "errorBtn"
                      : variant === "warning" ? "warningBtn"
                      : "successBtn"
                  }`}
                >
                  <span className="absolute top-0 left-0 right-0 h-[34%] opacity-70" />
                  <span className="relative block py-2">{confirmLabel}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative dot (as it is) */}
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "", labelClass = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-2xl ${labelClass}`}>{label}</span>
      <span className={`text-2xl ${valueClass}`}>{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10 my-4" />;
}
