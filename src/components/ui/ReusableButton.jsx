import React from "react";

const ReusableButton = ({
  label,
  onClick,
  icon: Icon,
  disabled = false,
  loading = false,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const baseClasses =
    "group relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 active:scale-[0.97]";

  const variants = {
    primary: `
  w-full py-3 px-4
  rounded-xl
  text-white
  font-semibold
  bg-gradient-to-b
  from-[#27f2b5]
  via-[#0f9f74]
  to-[#065f46]
  shadow-[0_4px_0_#064e3b,0_10px_25px_rgba(16,185,129,0.30)]
  hover:translate-y-[-1px]
  hover:shadow-[0_6px_0_#064e3b,0_14px_30px_rgba(16,185,129,0.40)]
  active:translate-y-[1px]
  active:shadow-[0_2px_0_#064e3b,0_6px_15px_rgba(16,185,129,0.25)]
  transition-all duration-200
`,

    secondary: `
      w-full py-3.5 px-6
      bg-gradient-to-b from-[#0f172a] via-[#07130f] to-[#020617]
      text-emerald-300
      border border-emerald-500/20
      shadow-[0_8px_0_rgb(2,44,34),0_18px_35px_rgba(0,0,0,0.6)]
      hover:translate-y-[-2px]
      hover:border-emerald-400/40
      hover:shadow-[0_12px_0_rgb(2,44,34),0_22px_45px_rgba(16,185,129,0.18)]
    `,

    header: `
      py-3 px-6
      rounded-full
      bg-gradient-to-b from-[#22c55e] via-[#15803d] to-[#14532d]
      text-white
      border border-emerald-300/20
      shadow-[0_6px_0_rgb(20,83,45),0_16px_35px_rgba(16,185,129,0.35)]
      hover:translate-y-[-2px]
      hover:shadow-[0_10px_0_rgb(20,83,45),0_22px_45px_rgba(16,185,129,0.45)]
    `,
  };

  return (
    <>
      <style>{`
        /* Premium Shine */
        .shine-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: -140%;
          width: 90%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.18) 50%,
            transparent 100%
          );
          transform: skewX(-25deg);
          transition: all 0.8s ease;
        }

        .shine-effect:hover::before {
          left: 140%;
        }

        /* Glow Layer */
        .glow-layer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at top,
            rgba(255,255,255,0.18),
            transparent 70%
          );
          pointer-events: none;
        }

        /* Spinner */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.25);
          border-top-color: white;
          border-radius: 9999px;
          animation: spin 0.6s linear infinite;
        }
      `}</style>

      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          ${baseClasses}
          ${variants[variant]}
          ${className}
          shine-effect
        `}
      >
        {/* 3D Gloss */}
        <div className="glow-layer" />

        {/* Inner Dark Overlay */}
        <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {loading ? (
            <div className="spinner" />
          ) : (
            Icon && (
              <Icon className="w-5 h-5 text-white drop-shadow-md" />
            )
          )}

          <span className="text-sm md:text-base tracking-wide font-semibold">
            {loading ? "Processing..." : label}
          </span>
        </div>
      </button>
    </>
  );
};

export default ReusableButton;