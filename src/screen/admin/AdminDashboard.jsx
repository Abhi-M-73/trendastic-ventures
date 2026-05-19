"use client";
import { Users, DollarSign, TrendingUp, PiggyBank, ArrowUpRight, CreditCard, CalendarDays, Wallet, BarChart2, GitBranch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllIncome } from '../../api/admin.api';
import AdminAllTeam from './team/AdminAllTeam';

const AdminDashboard = () => {
  const [cardData, setCardData] = useState({});

  const fetchGetAllIncome = async () => {
    try {
      const res = await getAllIncome();
      setCardData(res?.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetAllIncome();
  }, []);

  const fmt = (val) => `₹${(val ?? 0).toLocaleString()} `;

  const cards = [
    {
      title: "Total Users",
      value: cardData?.totalUsers ?? 0,
      icon: <Users className="w-5 h-5" />,
      accent: "#6366f1",
      lightBg: "#eef2ff",
    },
    {
      title: "Total Active Users",
      value: cardData?.activeUsers ?? 0,
      icon: <Users className="w-5 h-5" />,
      accent: "#10b981",
      lightBg: "#ecfdf5",
    },
    {
      title: "Total Inactive Users",
      value: cardData?.totalInactiveUsers ?? 0,
      icon: <Users className="w-5 h-5" />,
      accent: "#f59e0b",
      lightBg: "#fffbeb",
    },
    {
      title: "Total GH Amount",
      value: fmt(cardData?.totalGetHelpAmount),
      icon: <ArrowUpRight className="w-5 h-5" />,
      accent: "#ef4444",
      lightBg: "#fef2f2",
    },
    {
      title: "Total PH Amount",
      value: fmt(cardData?.totalPayHelpAmount),
      icon: <CalendarDays className="w-5 h-5" />,
      accent: "#8b5cf6",
      lightBg: "#f5f3ff",
    },

    // {
    //   title: "Total ROI",
    //   value: fmt(cardData?.totalRoi),
    //   icon: <TrendingUp className="w-5 h-5" />,
    //   accent: "#06b6d4",
    //   lightBg: "#ecfeff",
    // },

    // {
    //   title: "Today ROI",
    //   value: fmt(cardData?.todayRoi),
    //   icon: <BarChart2 className="w-5 h-5" />,
    //   accent: "#ec4899",
    //   lightBg: "#fdf2f8",
    // },
  ];

  return (
    <div className="min-h-screen text-slate-50">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Admin <span className="text-[var(--btnColor)]">Dashboard</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Overview of platform performance and key metrics.
          </p>
        </div>
        <div className="flex gap-3">
         
        
        </div>
      </div>

      {/* 11 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: card.accent }} />

            <div className="p-5">
              {/* Icon + Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-300">
                  {card.title}
                </span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: card.lightBg, color: card.accent }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Main Value */}
              <p className="text-3xl font-bold text-white tracking-tight">
                {card.value}
              </p>
            </div>

            {/* Decorative circle */}
            <div
              className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-10"
              style={{ background: card.accent }}
            />
          </div>
        ))}
      </div>

      <div className='mt-10'>
        <AdminAllTeam />
      </div>
    </div>
  );
};

export default AdminDashboard;