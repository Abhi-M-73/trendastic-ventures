import {
    TrendingUp,
    Users,
    Wallet,
    ShieldCheck,
    Gamepad2,
    CreditCard,
    Trophy,
    ChevronRight,
} from 'lucide-react';

import React from 'react';
import SectionLabel from '../../components/ui/SectionLabel';

const StatsSection = () => {

    const STATS = [
        {
            icon: <Users size={20} />,
            num: "50L+",
            label: "Active Players"
        },
        {
            icon: <TrendingUp size={20} />,
            num: "200+",
            label: "Daily Markets"
        },
        {
            icon: <Wallet size={20} />,
            num: "₹10Cr+",
            label: "Weekly Payouts"
        },
    ];

    const HOW_IT_WORKS = [
        {
            icon: <CreditCard size={22} />,
            title: "Create Account",
            desc: "Register securely and activate your wallet instantly."
        },
        {
            icon: <Wallet size={22} />,
            title: "Add Balance",
            desc: "Deposit funds using fast & secure payment methods."
        },
        {
            icon: <Gamepad2 size={22} />,
            title: "Play & Predict",
            desc: "Join live games, betting markets and exchange rooms."
        },
        {
            icon: <Trophy size={22} />,
            title: "Win Rewards",
            desc: "Withdraw winnings instantly with zero delays."
        },
    ];

    return (
        <div className="relative px-2">

            {/* ───────── REFER & EARN ───────── */}
            <div
                className="
                    mx-3
                    mt-4
                    rounded-[30px]
                    border
                    border-emerald-500/25
                    relative
                    overflow-hidden
                    p-6
                "
                style={{
                    background:
                        "linear-gradient(135deg,#022c22,#064e3b,#065f46)"
                }}
            >

                {/* GLOW */}
                <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] rounded-full bg-emerald-400/10 blur-[60px]" />

                <div className="relative z-10 flex items-center justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck
                                size={18}
                                className="text-emerald-300"
                            />

                            <span className="text-emerald-300 text-xs font-bold tracking-[2px] uppercase">
                                Referral Program
                            </span>
                        </div>

                        <h2 className="text-white text-3xl font-black leading-none">
                            REFER & EARN
                        </h2>

                        <p className="text-emerald-100 text-xl font-black mt-2">
                            ₹500 Bonus
                        </p>

                        <p className="text-emerald-100/55 text-xs mt-2 max-w-[240px] leading-relaxed">
                            Invite your friends and earn rewards
                            every time they join and play.
                        </p>

                    </div>

                    <button
                        className="
                            flex-shrink-0
                            px-5
                            py-3
                            rounded-full
                            bg-white
                            text-[#065f46]
                            text-xs
                            font-black
                            hover:scale-105
                            transition-all
                            duration-300
                            shadow-[0_0_30px_rgba(255,255,255,0.2)]
                        "
                    >
                        INVITE NOW
                    </button>

                </div>

            </div>

            {/* ───────── STATS ───────── */}
            <SectionLabel>
                📊 Platform Stats
            </SectionLabel>

            <div className="grid grid-cols-3 gap-3 px-3 pb-8">

                {STATS.map((s) => (

                    <div
                        key={s.label}
                        className="
                            relative
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-emerald-500/15
                            bg-[#071b13]
                            py-5
                            flex
                            flex-col
                            items-center
                            gap-2
                        "
                    >

                        {/* CARD GLOW */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] bg-emerald-400/10 blur-[40px]" />

                        <div className="relative z-10 flex flex-col items-center gap-2">

                            <span className="text-emerald-400">
                                {s.icon}
                            </span>

                            <span className="text-emerald-300 text-[1.5rem] font-black leading-none">
                                {s.num}
                            </span>

                            <span className="text-emerald-100/45 text-[10px] font-semibold text-center">
                                {s.label}
                            </span>

                        </div>

                    </div>
                ))}

            </div>

            {/* ───────── HOW IT WORKS ───────── */}
            <SectionLabel>
                ⚡ How It Works
            </SectionLabel>

            <div className="px-3 pb-10 flex flex-col gap-4">

                {HOW_IT_WORKS.map((item, index) => (

                    <div
                        key={item.title}
                        className="
                            relative
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-emerald-500/15
                            bg-[#071b13]
                            p-4
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        {/* LEFT */}
                        <div className="flex items-center gap-4">

                            {/* NUMBER */}
                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-emerald-500/10
                                    border
                                    border-emerald-500/20
                                    flex
                                    items-center
                                    justify-center
                                    text-emerald-300
                                    font-black
                                    text-sm
                                "
                            >
                                0{index + 1}
                            </div>

                            {/* CONTENT */}
                            <div>

                                <div className="flex items-center gap-2 mb-1">

                                    <span className="text-emerald-400">
                                        {item.icon}
                                    </span>

                                    <h3 className="text-white font-bold text-sm">
                                        {item.title}
                                    </h3>

                                </div>

                                <p className="text-emerald-100/45 text-[11px] leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>

                        </div>

                        {/* RIGHT ICON */}
                        <ChevronRight
                            size={18}
                            className="text-emerald-400/40"
                        />

                    </div>
                ))}

            </div>

        </div>
    );
};

export default StatsSection;
