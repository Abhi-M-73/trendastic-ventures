import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';

// ── Sport config ──────────────────────────────────────────────
const SPORT_META = {
    4: { label: "Cricket", emoji: "🏏", color: "#22d3a0", glow: "rgba(34,211,160,0.18)" },
    1: { label: "Football", emoji: "⚽", color: "#f59e0b", glow: "rgba(245,158,11,0.18)" },
    2: { label: "Tennis", emoji: "🎾", color: "#a78bfa", glow: "rgba(167,139,250,0.18)" },
};

// ── Parse raw API response into clean match list ──────────────
function parseMatches(raw) {
    return Object.entries(raw)
        .map(([id, data]) => {
            const teams = [];
            let i = 0;
            while (data[i]) { teams.push(data[i]); i++; }
            return {
                id,
                eventName: data.eventName,
                inPlay: data.inPlay === 1,
                status: data.status,
                eventTypeId: data.eventTypeId,
                date: data.date?.date || data.date,
                timeStatus: data.timeStatus,
                score: data.score || null,
                score2: data.score2 || null,
                isTv: data.isTv,
                isFancy: data.isFancy,
                isBookmaker: data.isBookmaker,
                visible: data.visible,
                sort: data.sort,
                teams,
            };
        })
        .sort((a, b) => a.sort - b.sort);
}

// ── Score badge ───────────────────────────────────────────────
function ScoreBadge({ match }) {
    const { score, score2, eventTypeId } = match;
    // Football: show score from `score`
    if (eventTypeId === 1 && score) {
        return (
            <div className="score-badge football">
                <span>{score.total_1}</span>
                <span className="sep">:</span>
                <span>{score.total_2}</span>
            </div>
        );
    }
    // Cricket: show from score2
    if (eventTypeId === 4 && score2) {
        const { line1, line2, line3 } = score2;
        if (line1) return (
            <div className="score-badge cricket">
                <span className="bat">{line1}</span>
                <span className="runs">{line2}</span>
                {line3 && <span className="ov">{line3}</span>}
            </div>
        );
        return <div className="score-badge upcoming">{line2}</div>;
    }
    return null;
}

// ── Time/status pill ──────────────────────────────────────────
function TimePill({ match }) {
    const { inPlay, timeStatus, eventTypeId } = match;

    const safeTime =
        typeof timeStatus === "object"
            ? timeStatus?.date
            : timeStatus;

    if (inPlay) {
        if (eventTypeId === 1) {
            const isHT = safeTime === "HT";

            return (
                <span className={`pill ${ isHT ? "ht" : "live-min" } `}>
                    {isHT ? "HT" : safeTime}
                </span>
            );
        }

        return <span className="pill live-dot">● LIVE</span>;
    }

    return (
        <span className="pill upcoming-time">
            {safeTime || "--"}
        </span>
    );
}


// ── Odds button ───────────────────────────────────────────────
function OddsBtn({ back, lay }) {
    return (
        <div className="odds-pair">
            <button className="odds-btn back">{back?.price ?? "—"}</button>
            <button className="odds-btn lay">{lay?.price ?? "—"}</button>
        </div>
    );
}

// ── Single match card ─────────────────────────────────────────
function MatchCard({ match }) {
    const meta = SPORT_META[match.eventTypeId] || SPORT_META[4];
    const hasThree = match.teams.length === 3;

    return (
        <div className="match-card" style={{ "--accent": meta.color, "--glow": meta.glow }}>
            {/* Header row */}
            <div className="card-head">
                <span className="sport-tag">{meta.emoji} {meta.label}</span>
                <div className="head-right">
                    {match.isTv === 1 && <span className="badge tv">📺</span>}
                    {match.isFancy === 1 && <span className="badge fancy">F</span>}
                    {match.isBookmaker === 1 && <span className="badge bm">BM</span>}
                    <TimePill match={match} />
                </div>
            </div>

            {/* Score */}
            <ScoreBadge match={match} />

            {/* Teams + Odds */}
            <div className="teams">
                {match.teams.map((team, idx) => (
                    <div key={idx} className={`team-row ${team.teamName === "The Draw" ? "draw" : ""}`}>
                        <span className="team-name">{team.teamName}</span>
                        <OddsBtn
                            back={team.ex?.availableToBack?.[0]}
                            lay={team.ex?.availableToLay?.[0]}
                        />
                    </div>
                ))}
            </div>

            {/* Bet button */}
            <button className="bet-btn">BET NOW</button>
        </div>
    );
}

// ── Refresh countdown ring ────────────────────────────────────
function RefreshRing({ countdown, total }) {
    const r = 10, circ = 2 * Math.PI * r;
    const progress = circ * (1 - countdown / total);
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="14" cy="14" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" fill="none" />
            <circle
                cx="14" cy="14" r={r}
                stroke="#22d3a0"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={progress}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
            />
        </svg>
    );
}

// ── Main component ────────────────────────────────────────────
const REFRESH_INTERVAL = 1;

const SportsBook = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
    const [activeTab, setActiveTab] = useState("ALL");
    const timerRef = useRef(null);
    const cdRef = useRef(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "https://cache7.live/api/exchange/open/group/sportsbook/0",
                { headers: { "Content-Type": "application/json" } }
            );
            setMatches(parseMatches(res.data));
            setLastUpdated(new Date());
            setError(null);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        timerRef.current = setInterval(() => {
            fetchData();
            setCountdown(REFRESH_INTERVAL);
        }, REFRESH_INTERVAL * 1000);

        cdRef.current = setInterval(() => {
            setCountdown(c => (c <= 1 ? REFRESH_INTERVAL : c - 1));
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
            clearInterval(cdRef.current);
        };
    }, []);

    const tabs = ["ALL", "🏏 Cricket", "⚽ Football", "🎾 Tennis"];
    const typeMap = { "🏏 Cricket": 4, "⚽ Football": 1, "🎾 Tennis": 2 };

    const filtered = matches.filter(m => {
        if (activeTab === "ALL") return true;
        return m.eventTypeId === typeMap[activeTab];
    });

    const liveCount = matches.filter(m => m.inPlay).length;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .sb-root {
          font-family: 'DM Sans', sans-serif;
          background: black;
          min-height: 100vh;
          padding-bottom: 24px;
          color: #e2f5ec;
        }

        /* Header */
        .sb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 10px;
          border-bottom: 1px solid rgba(34,211,160,0.1);
        }
        .sb-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
          background: linear-gradient(90deg, #22d3a0, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        .live-pill {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.35);
          color: #f87171;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .live-dot-anim {
          width: 6px; height: 6px;
          background: #ef4444;
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .sb-refresh {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: rgba(34,211,160,0.5);
        }

        /* Tabs */
        .sb-tabs {
          display: flex;
          gap: 8px;
          padding: 12px 16px 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .sb-tabs::-webkit-scrollbar { display: none; }
        .tab-btn {
          flex-shrink: 0;
          background: rgba(34,211,160,0.07);
          border: 1px solid rgba(34,211,160,0.15);
          color: rgba(34,211,160,0.6);
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }
        .tab-btn:hover { border-color: rgba(34,211,160,0.4); color: #22d3a0; }
        .tab-btn.active {
          background: rgba(34,211,160,0.15);
          border-color: #22d3a0;
          color: #22d3a0;
          box-shadow: 0 0 10px rgba(34,211,160,0.15);
        }

       /* Cards grid */
.sb-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  padding: 12px 16px;
}

/* Small devices and above */
@media (min-width: 640px) {
  .sb-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

        /* Match card */
        .match-card {
          background: linear-gradient(145deg, #071b13 0%, #060f0a 100%);
          border: 1px solid rgba(var(--accent-rgb, 34,211,160), 0.15);
          border-radius: 14px;
          padding: 14px;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .match-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.5;
        }
        .match-card:hover {
          border-color: rgba(34,211,160,0.35);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px var(--glow);
        }

        /* Card header */
        .card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .sport-tag {
          font-size: 10px;
          font-weight: 600;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          opacity: 0.8;
        }
        .head-right {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .badge {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.3px;
        }
        .badge.tv { background: rgba(59,130,246,0.15); color: #93c5fd; }
        .badge.fancy { background: rgba(251,191,36,0.15); color: #fcd34d; border: 1px solid rgba(251,191,36,0.25); }
        .badge.bm { background: rgba(167,139,250,0.15); color: #c4b5fd; border: 1px solid rgba(167,139,250,0.25); }

        /* Pills */
        .pill {
          font-size: 9px;
          font-weight: 700;
          padding: 3px 7px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        .pill.live-dot {
          background: rgba(239,68,68,0.15);
          color: #f87171;
          border: 1px solid rgba(239,68,68,0.3);
          animation: blink 1.5s infinite;
        }
        .pill.live-min {
          background: rgba(239,68,68,0.12);
          color: #fca5a5;
          border: 1px solid rgba(239,68,68,0.25);
        }
        .pill.ht {
          background: rgba(245,158,11,0.15);
          color: #fcd34d;
          border: 1px solid rgba(245,158,11,0.3);
        }
        .pill.upcoming-time {
          background: rgba(100,116,139,0.2);
          color: #94a3b8;
          border: 1px solid rgba(100,116,139,0.2);
        }

        /* Score badge */
        .score-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }
        .score-badge.football {
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          color: #fcd34d;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 700;
        }
        .score-badge.football .sep { color: rgba(245,158,11,0.4); }
        .score-badge.cricket {
          background: rgba(34,211,160,0.08);
          border: 1px solid rgba(34,211,160,0.2);
          color: #6ee7b7;
          gap: 8px;
        }
        .score-badge.cricket .bat { font-weight: 700; color: #a7f3d0; }
        .score-badge.cricket .runs { font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; }
        .score-badge.cricket .ov { color: rgba(34,211,160,0.5); font-size: 10px; }
        .score-badge.upcoming {
          background: rgba(100,116,139,0.1);
          border: 1px solid rgba(100,116,139,0.15);
          color: #64748b;
        }

        /* Teams */
        .teams { display: flex; flex-direction: column; gap: 7px; margin-bottom: 12px; }
        .team-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .team-row.draw .team-name { color: rgba(148,163,184,0.6); font-style: italic; }
        .team-name {
          flex: 1;
          font-size: 13px;
          font-weight: 600;
          color: #e2f5ec;
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Odds pair */
        .odds-pair { display: flex; gap: 4px; flex-shrink: 0; }
        .odds-btn {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          min-width: 46px;
          text-align: center;
          transition: all 0.15s;
        }
        .odds-btn:hover { filter: brightness(1.2); transform: scale(1.03); }
        .odds-btn.back {
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.3);
          color: #93c5fd;
        }
        .odds-btn.lay {
          background: rgba(251,113,133,0.12);
          border: 1px solid rgba(251,113,133,0.25);
          color: #fda4af;
        }

        /* Bet button */
        .bet-btn {
          width: 100%;
          background: linear-gradient(135deg, #059669, #16a34a);
          color: white;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 8px 0;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(16,185,129,0.2);
          transition: all 0.2s;
        }
        .bet-btn:hover {
          background: linear-gradient(135deg, #10b981, #22c55e);
          box-shadow: 0 4px 18px rgba(16,185,129,0.35);
        }
        .bet-btn:active { transform: scale(0.98); }

        /* Loading */
        .sb-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          gap: 12px;
          color: rgba(34,211,160,0.5);
          font-size: 13px;
        }
        .spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(34,211,160,0.15);
          border-top-color: #22d3a0;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Empty */
        .sb-empty {
          text-align: center;
          padding: 40px 16px;
          color: rgba(34,211,160,0.3);
          font-size: 13px;
        }

        /* Update bar */
        .sb-update-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 16px;
          font-size: 10px;
          color: rgba(34,211,160,0.35);
          border-top: 1px solid rgba(34,211,160,0.07);
          margin-top: 4px;
        }

        /* Section divider */
        .section-divider {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 0;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(34,211,160,0.4);
          text-transform: uppercase;
        }
        .section-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(34,211,160,0.08);
        }
      `}</style>

            <div className="sb-root">
                {/* Header */}
                <div className="sb-header">
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <h2 className="sb-title">⚡ SPORTSBOOK</h2>
                        <div className="sb-refresh">
                            <RefreshRing countdown={countdown} total={REFRESH_INTERVAL} />
                            <span>Updates in {countdown}s</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                        <div className="live-pill">
                            <span className="live-dot-anim" />
                            {liveCount} LIVE
                        </div>
                        {lastUpdated && (
                            <span style={{ fontSize: 9, color: "rgba(34,211,160,0.3)" }}>
                                Updated {lastUpdated.toLocaleTimeString()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="sb-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab} {tab !== "ALL" && matches.filter(m => m.eventTypeId === typeMap[tab]).length > 0
                                ? `(${matches.filter(m => m.eventTypeId === typeMap[tab]).length})` : ""}
                        </button>
                    ))}
                </div>

                {/* Body */}
                {loading ? (
                    <div className="sb-loading">
                        <div className="spinner" />
                        Fetching live markets...
                    </div>
                ) : error ? (
                    <div className="sb-empty">⚠️ {error}</div>
                ) : filtered.length === 0 ? (
                    <div className="sb-empty">No matches found.</div>
                ) : (
                    <div className="sb-grid">
                        {filtered.map(match => (
                            <MatchCard key={match.id} match={match} />
                        ))}
                    </div>
                )}

                {/* Bottom bar */}
                <div className="sb-update-bar">
                    <span>{matches.length} markets loaded</span>
                    <span>Auto-refresh every {REFRESH_INTERVAL}s</span>
                </div>
            </div>
        </>
    );
};

export default SportsBook;