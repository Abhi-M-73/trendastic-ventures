import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-[0_0_40px_rgba(34,197,94,0.4)]">

        {/* Gradient rotating square */}
        {/* <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-400 via-sky-500 to-purple-500 animate-spin-slow" />
          <div className="absolute inset-[3px] rounded-2xl bg-slate-950 flex items-center justify-center">
            <span className="text-2xl font-semibold text-[var(--btnColor)] tracking-tight">
              NL
            </span>
          </div>
        </div> */}

        {/* Loading text with dots */}
        <div className="flex flex-col-reverse items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-300">
            Loading
          </p>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3 s]" />
            <span className="w-3 h-3 rounded-full bg-sky-400 animate-bounce" />
            <span className="w-3 h-3 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-40 h-1.5 overflow-hidden rounded-full bg-slate-700/70">
          <div className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 animate-loader-bar" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
