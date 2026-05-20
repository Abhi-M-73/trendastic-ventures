import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AuthMain = ({ inner, name }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [phase, setPhase] = useState("enter");

    const handleRouteChange = (path) => {
        if (path === location.pathname) return;

        setPhase("exit");

        setTimeout(() => {
            navigate(path);
            setPhase("enter");
        }, 400);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020b07]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1974&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#02110a]/95 via-[#02110a]/85 to-[#02110a]/95" />

            <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-emerald-500/20 blur-[120px] rounded-full" />

            <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-500/20 blur-[120px] rounded-full" />

            {/* MAIN */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-3 md:p-6">
                <div className="w-full max-w-7xl grid md:grid-cols-2 gap-10 items-center">
                    <div className="hidden md:flex flex-col justify-center">
                        <Link to="/" className="flex items-center gap-4 mb-10">
                            <div
                                className="w-14 h-14 rounded-2xl bg-gradient-to-b from-emerald-400 to-green-700
                                        flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.35)]">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-3xl font-black text-white tracking-wide">
                                    {name || "BETVERSE"}
                                </h2>

                                <p className="text-emerald-400 text-xs tracking-[4px] uppercase">
                                    Live Sportsbook
                                </p>
                            </div>
                        </Link>

                        {/* HEADING */}
                        <h1
                            className="text-white leading-none"
                            style={{
                                fontSize: "clamp(4rem,4vw,4rem)",
                                letterSpacing: "2px",
                                fontWeight: "500",
                            }}
                        >
                            PLAY
                            <span className="block text-emerald-400">
                                WIN BIG
                            </span>
                        </h1>

                        {/* SUBTEXT */}
                        <p
                            className="mt-5 text-emerald-100/70 max-w-xl leading-relaxed"
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            Experience real-time betting, instant withdrawals,
                            live casino games, sportsbook action, and premium odds
                            — all in one powerful platform.
                        </p>

                        {/* FEATURES */}
                        <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl">

                            <div className="bg-white/5 border border-emerald-500/15 backdrop-blur-xl rounded-2xl p-5">
                                <h3 className="text-3xl font-black text-white">50K+</h3>
                                <p className="text-emerald-400 text-sm mt-1">
                                    Active Players
                                </p>
                            </div>

                            <div className="bg-white/5 border border-emerald-500/15 backdrop-blur-xl rounded-2xl p-5">
                                <h3 className="text-3xl font-black text-white">24/7</h3>
                                <p className="text-emerald-400 text-sm mt-1">
                                    Live Betting
                                </p>
                            </div>

                            <div className="bg-white/5 border border-emerald-500/15 backdrop-blur-xl rounded-2xl p-5">
                                <h3 className="text-3xl font-black text-white">₹10Cr+</h3>
                                <p className="text-emerald-400 text-sm mt-1">
                                    Daily Payouts
                                </p>
                            </div>
                        </div>

                        {/* LIVE TAGS */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            {[
                                "🏏 Cricket",
                                "⚽ Football",
                                "🎾 Tennis",
                                "🎰 Casino",
                                "✈️ Aviator",
                                "🎨 Color Prediction",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="
                    px-4 py-2 rounded-full
                    bg-emerald-500/10
                    border border-emerald-400/20
                    text-emerald-300
                    text-sm font-semibold
                  "
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full flex items-center justify-center overflow-hidden">
                        <div
                            className={`
                relative
                w-full
                rounded-[32px]
                overflow-hidden
                border border-emerald-500/20
                bg-[#071b13]/80
                backdrop-blur-2xl
                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                transition-all duration-500
                ${phase === "enter"
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-full opacity-0"
                                }
              `}
                        >
                            {/* TOP GLOW */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                            {/* CARD CONTENT */}
                            <div className="relative z-10 p-6 md:p-8">
                                {React.cloneElement(inner, {
                                    onNavigate: handleRouteChange,
                                })}
                            </div>

                            {/* BOTTOM GLOW */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthMain;