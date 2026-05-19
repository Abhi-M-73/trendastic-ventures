import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cricketBanner from '../../assets/banner/cricketBanner.png'
import aviatorBanner from '../../assets/banner/aviatorBanner.png'
import footballBanner from '../../assets/banner/footballBanner.png'
import colorBanner from '../../assets/banner/colorBanner.png'
import tenisBanner from '../../assets/banner/tenisBanner.png'

const BANNERS = [
    {
        id: 1,
        image: cricketBanner,
        tag: "🏏 IPL 2026",
        title: "CRICKET",
        highlight: "BETTING",
        sub: "Live Matches & Instant Withdraw",
        badge: "PLAY NOW",
    },
    {
        id: 2,
        image: footballBanner,
        tag: "⚽ FIFA 2026",
        title: "FOOTBALL",
        highlight: "LIVE",
        sub: "Bet On Top Football Leagues",
        badge: "JOIN NOW",
    },
    {
        id: 3,
        image: tenisBanner,
        tag: "🎾 TENNIS",
        title: "TENNIS",
        highlight: "ODDS",
        sub: "Fast Betting & Real-Time Odds",
        badge: "BET NOW",
    },
    {
        id: 4,
        image: aviatorBanner,
        tag: "✈️ AVIATOR",
        title: "AVIATOR",
        highlight: "CRASH",
        sub: "Cash Out Before It Flies Away",
        badge: "PLAY AVIATOR",
    },
    {
        id: 5,
        image: colorBanner,
        tag: "🎨 COLOR GAME",
        title: "COLOR",
        highlight: "PREDICTION",
        sub: "Predict Colors & Win Big Rewards",
        badge: "START NOW",
    },
];

function BannerSlider() {
    const [cur, setCur] = useState(0);
    const timerRef = useRef(null);
    const total = BANNERS.length;

    const goTo = (n) => setCur(((n % total) + total) % total);

    const resetAuto = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setCur((p) => (p + 1) % total), 3500);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => setCur((p) => (p + 1) % total), 3500);
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div className="relative w-full overflow-hidden" style={{ height: "350px" }}>
            <div
                className="flex h-full"
                style={{
                    width: `${total * 100}%`,
                    transform: `translateX(-${(cur * 100) / total}%)`,
                    transition: "transform 0.55s cubic-bezier(.77,0,.18,1)",
                }}
            >
                {BANNERS.map((b) => (
                    <div
                        key={b.id}
                        className="relative overflow-hidden"
                        style={{ width: `${100 / total}%`, height: "350px", flexShrink: 0 }}
                    >
                        {b.image ? (
                            <>
                                <img
                                    src={b.image}
                                    alt={b.tag}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* DARK OVERLAY */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background:
                                            "linear-gradient(90deg,rgba(4,19,13,0.82) 0%,rgba(4,19,13,0.45) 45%,rgba(4,19,13,0.08) 100%)",
                                    }}
                                />

                                {/* GLOW */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </>
                        ) : null}
                        {/* TEXT OVERLAY — always shown */}
                        <div
                            className="absolute inset-0 flex items-center px-6 md:px-10"
                        >
                            <div className="max-w-[55%]">
                                {/* TAG */}
                                {/* <span
                                    className="inline-block mb-3 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300 text-[10px] font-bold tracking-[2px]"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {b.tag}
                                </span> */}

                                {/* <h2
                                    className="leading-none"
                                    style={{
                                        fontSize: "clamp(2.2rem,7vw,4.5rem)",
                                        color: "#fff",
                                        letterSpacing: "2px",
                                        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    {b.title}

                                    <span
                                        style={{
                                            color: "#34d399",
                                            display: "block",
                                        }}
                                    >
                                        {b.highlight}
                                    </span>
                                </h2> */}

                                {/* <p
                                    className="mt-2 text-emerald-100/80 font-medium"
                                    style={{
                                        fontSize: "13px",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {b.sub}
                                </p>

                                <button
                                    className="
        mt-4
        px-5
        py-2.5
        rounded-full
        bg-gradient-to-r
        from-emerald-500
        to-green-600
        text-white
        text-xs
        font-bold
        shadow-[0_8px_20px_rgba(16,185,129,0.35)]
        hover:scale-105
        active:scale-95
        transition-all
      "
                                >
                                    {b.badge}
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PREV ARROW */}
            <button
                onClick={() => { goTo(cur - 1); resetAuto(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 bg-black/30 hover:bg-emerald-500/40 text-white transition-colors"
            >
                <ChevronLeft size={18} />
            </button>

            {/* NEXT ARROW */}
            <button
                onClick={() => { goTo(cur + 1); resetAuto(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 bg-black/30 hover:bg-emerald-500/40 text-white transition-colors"
            >
                <ChevronRight size={18} />
            </button>

            {/* DOTS */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { goTo(i); resetAuto(); }}
                        style={{
                            height: "6px",
                            width: i === cur ? "20px" : "6px",
                            borderRadius: "3px",
                            background: i === cur ? "#34d399" : "rgba(255,255,255,0.3)",
                            transition: "all 0.3s",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


export default BannerSlider;