import { TrendingUp, Users, Wallet } from 'lucide-react';
import React from 'react'
import SectionLabel from '../../components/ui/SectionLabel';

const StatsSection = () => {
    const STATS = [
            { icon: <Users size={20} />, num: "50L+", label: "Players" },
            { icon: <TrendingUp size={20} />, num: "200+", label: "Daily Markets" },
            { icon: <Wallet size={20} />, num: "₹10Cr", label: "Paid Out" },
        ];
    
  return (
    <div>
          {/* ── REFER & EARN BANNER ── */}
          <div
              className="mx-3 mt-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between relative overflow-hidden"
              style={{
                  background: "linear-gradient(135deg,#052e16,#065f46,#064e3b)",
                  padding: "18px 20px",
              }}
          >
              <div className="absolute pointer-events-none"
                  style={{ right: "-20px", top: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(16,185,129,0.08)" }} />
              <div className="absolute pointer-events-none"
                  style={{ right: "0", bottom: "-10px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(22,163,74,0.06)" }} />

              <div className="relative">
                  <h3
                      className="text-white leading-none"
                      style={{  fontSize: "1.7rem", letterSpacing: "1px" }}
                  >
                      REFER &amp; EARN <span style={{ color: "#6ee7b7" }}>₹500</span>
                  </h3>
                  <p style={{ color: "rgba(167,243,208,0.75)", fontSize: "11px", marginTop: "5px", fontWeight: 500 }}>
                      Invite friends — earn on every deposit they make!
                  </p>
              </div>

              <button
                  onClick={() => navigate("/register")}
                  className="relative flex-shrink-0 bg-white font-extrabold rounded-full hover:scale-105 active:scale-95 transition-all"
                  style={{
                      color: "#065f46", fontSize: "12px",
                      padding: "9px 20px",
                      boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                  }}
              >
                  INVITE NOW
              </button>
          </div>

          {/* ── PLATFORM STATS ── */}
          <SectionLabel>📊 Platform Stats</SectionLabel>
          <div className="grid grid-cols-3 gap-2.5 px-3 pb-8">
              {STATS.map((s) => (
                  <div
                      key={s.label}
                      className="flex flex-col items-center gap-2 rounded-xl border border-emerald-500/15 py-5"
                      style={{ background: "#071b13" }}
                  >
                      <span style={{ color: "rgba(52,211,153,0.55)" }}>{s.icon}</span>
                      <span
                          className="font-bold leading-none"
                          style={{
                              fontSize: "1.6rem",
                              color: "#34d399",
                          }}
                      >
                          {s.num}
                      </span>
                      <span style={{ color: "rgba(52,211,153,0.5)", fontSize: "10px", fontWeight: 500 }}>
                          {s.label}
                      </span>
                  </div>
              ))}
          </div>
    </div>
  )
}

export default StatsSection
