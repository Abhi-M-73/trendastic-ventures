import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Gift,
  Zap,
  Trophy,
  Users,
  TrendingUp,
  Wallet,
} from "lucide-react";
import BannerSlider from "../../components/ui/BannerSlider";
import SectionLabel from "../../components/ui/SectionLabel";

import gif1 from "../../assets/gif/aviator.gif";
import gif2 from "../../assets/gif/color-pridiction.gif";
import gif3 from "../../assets/gif/fungames.gif";
import gif4 from "../../assets/gif/mines.gif";

import gameImage1 from "../../assets/games/SEXYBCRT-LOBBY.webp";
import gameImage2 from "../../assets/games/vivo_lobby.webp";
import gameImage3 from "../../assets/games/marbles_lobby.webp";
import gameImage4 from "../../assets/games/ezg_lobby.webp";
import gameImage5 from "../../assets/games/aura-lobby.webp";
import gameImage6 from "../../assets/games/MAC88-LOBBY.webp";
import gameImage7 from "../../assets/games/slot-games-bg.e8f5c193.webp";
import gameImage8 from "../../assets/games/e-cricket-bg.4e6e7bfa.webp";
import gameImage9 from "../../assets/games/download.webp";
import gameImage10 from "../../assets/games/live-casinos-bg.7bea6587.webp";
import gameImage11 from "../../assets/games/sportsbook-bg.5772b654.webp";
import gameImage12 from "../../assets/games/bbl_bombaylivelobby.webp";
import gameImage13 from "../../assets/games/neo_lobby.webp";
import gameImage14 from "../../assets/games/win_live_lobby.webp";
import gameImage15 from "../../assets/games/pltl_live_lobby.webp";
import gameImage16 from "../../assets/games/asg_lobby.webp";
import gameImage17 from "../../assets/games/jili_lobby.webp";
import axios from "axios";


const GAME_CATEGORIES = [
  {
    title: "Sexy Baccarat",
    image: gameImage1,
    gradient: "from-rose-700 to-red-500",
  },
  {
    title: "Vivo Lobby",
    image: gameImage2,
    gradient: "from-cyan-700 to-sky-500",
  },
  {
    title: "Marbles Lobby",
    image: gameImage3,
    gradient: "from-orange-700 to-amber-500",
  },
  {
    title: "EZG Lobby",
    image: gameImage4,
    gradient: "from-emerald-700 to-green-500",
  },
  {
    title: "Aura Lobby",
    image: gameImage5,
    gradient: "from-fuchsia-700 to-pink-500",
  },
  {
    title: "MAC88 Lobby",
    image: gameImage6,
    gradient: "from-violet-800 to-purple-500",
  },
  {
    title: "Slot Games",
    image: gameImage7,
    gradient: "from-yellow-700 to-orange-500",
  },
  {
    title: "e-Cricket",
    image: gameImage8,
    gradient: "from-indigo-950 to-cyan-600",
  },
  {
    title: "Evolution",
    image: gameImage9,
    gradient: "from-lime-700 to-stone-300",
  },
  {
    title: "Live Casino",
    image: gameImage10,
    gradient: "from-red-700 to-orange-500",
  },
  {
    title: "Sportsbook",
    image: gameImage11,
    gradient: "from-sky-700 to-cyan-500",
  },
  {
    title: "BBL Bombay",
    image: gameImage12,
    gradient: "from-pink-700 to-rose-500",
  },
  {
    title: "Neo Lobby",
    image: gameImage13,
    gradient: "from-teal-700 to-emerald-500",
  },
  {
    title: "Win Live",
    image: gameImage14,
    gradient: "from-blue-800 to-indigo-500",
  },
  {
    title: "ASG Lobby",
    image: gameImage16,
    gradient: "from-fuchsia-800 to-violet-500",
  },
  {
    title: "Jili Lobby",
    image: gameImage17,
    gradient: "from-amber-700 to-yellow-500",
  },
];


const PROMO_PILLS = [
  { icon: <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />, label: "LIVE MATCHES" },
  { icon: <Flame size={12} className="text-orange-400" />, label: "IPL 2026 SPECIAL" },
  { icon: <Wallet size={12} className="text-emerald-400" />, label: "10% DAILY BONUS" },
  { icon: <Gift size={12} className="text-emerald-400" />, label: "REFER & EARN" },
  { icon: <Zap size={12} className="text-yellow-400" />, label: "INSTANT WITHDRAW" },
  { icon: <Trophy size={12} className="text-emerald-400" />, label: "WEEKLY CONTEST" },
];

const gifSection = [gif1, gif2, gif3, gif4];


export default function HeroSection() {
  const navigate = useNavigate();

 
  return (
    <div className="w-full min-h-screen bg-[#04130d] pt-32">
      <BannerSlider />

      {/* ── PROMO PILLS ── */}
      <div
        className="flex gap-2 px-3 py-3 border-b border-emerald-500/10"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        {PROMO_PILLS.map((p, i) => (
          <button
            key={i}
            className="flex-shrink-0 flex items-center gap-1.5 border border-emerald-500/20 hover:border-emerald-400/50 rounded-full px-3 py-1.5 transition-colors"
            style={{ background: "#0a2318" }}
          >
            {p.icon}
            <span className="text-emerald-100 text-[11px] font-semibold whitespace-nowrap">
              {p.label}
            </span>
          </button>
        ))}
      </div>

      <SectionLabel>🎮 Popular Games</SectionLabel>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-3">
        {gifSection?.map((s, i) => (
          <button
            key={i}
            className="group relative overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-emerald-500/15 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 active:scale-95 bg-[#071b13]"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* GIF */}
            <img
              src={s}
              alt="game"
              className="w-full h-[95px] object-cover rounded-2xl"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* ───────── GAME CATEGORY SECTION ───────── */}

      <SectionLabel>🎮 Sports Categories</SectionLabel>
      <div
        className="
    grid
    grid-flow-col
    grid-rows-2
    auto-cols-[280px]
    gap-3
    px-3
    py-2
    overflow-x-auto
  "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {GAME_CATEGORIES.map((item, i) => (
          <button
            key={i}
            className="
        group
        relative
        overflow-hidden
        w-[280px]
        h-[90px]
        rounded-2xl
        flex items-center
        px-4
        border border-white/10
        shadow-[0_10px_25px_rgba(0,0,0,0.35)]
        hover:scale-[1.02]
        active:scale-95
        transition-all duration-300
        bg-cover
        bg-center
      "
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-all duration-300" />

            {/* LIGHT EFFECT */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent" />

            {/* TITLE */}
            <div className="relative z-10 flex items-center gap-2">
              <span
                className="text-white font-bold text-sm md:text-base drop-shadow-lg"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {item.title}
              </span>
            </div>

            {/* SHINE */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />

            {/* BOTTOM BORDER */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
          </button>
        ))}
      </div>


     
    </div>
  );
}