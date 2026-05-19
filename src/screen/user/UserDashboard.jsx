import React from 'react';
import { TrendingUp, DollarSign, CreditCard, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight, Calendar, Award, Target, Activity, User, Copy, Users, ShoppingCart, TrendingUpDown, ArrowBigUpDash, ArrowBigDownDash, Recycle, Network, Pin, IndianRupee, HandCoins } from 'lucide-react';
import { backendConfig, MainContent } from '../../utils/mainContent';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useFetchProfile from '../../hooks/usefetchProfile';
import { useEffect } from 'react';
import { isBoolean } from 'lodash';
import { Link } from 'react-router-dom';
import UserGetHelpQueues from './UserGetHelpQueues';
import UserPayHelpQueues from './UserPayHelpQueues';

const UserDashboard = () => {
  const { fetchProfile } = useFetchProfile();
  const { user: data } = useSelector((state) => state.auth);
  console.log(data);

  const directUserCount = data?.referedUsers
    ?.filter(
      (user) =>
        user?.totalSilverPayHelpAmount > 0 ||
        user?.totalGoldPayHelpAmount > 0 ||
        user?.totalDiamondPayHelpAmount > 0
    )
    ?.length || 0;

  const isPaymentDetailsAvailable =
    !!data?.accountNumber || !!data?.upiId || !!data?.IFSCCode || !!data?.googlePayNumber || !!data?.phonePayNumber || !!data?.walletAddress;

  const formatNumber = (number = 0, decimals = 2) =>
    Number(number)?.toFixed(decimals);

  const stats = [
    {
      title: 'Total Direct PH Users',
      value: directUserCount || 0,
      icon: Users,
      color: 'from-blue-500 via-sky-400 to-cyan-400'
    },
    {
      title: 'Total GH Amount',
      value: "₹" + formatNumber(data?.getHelpTotalAmount),
      icon: IndianRupee,
      color: 'from-emerald-500 via-lime-400 to-teal-400'
    },
    {
      title: 'Total PH Amount',
      value: "₹" + formatNumber(data?.payHelpTotalAmount) || 0,
      icon: HandCoins,
      color: 'from-emerald-500 via-lime-400 to-teal-400'
    },
    {
      title: 'Silver Pin Count',
      value: data?.silverPinCount || 0,
      icon: Pin,
      color: 'from-emerald-500 via-lime-400 to-teal-400'
    },
    {
      title: 'Gold Pin Count',
      value: data?.goldPinCount || 0,
      icon: Pin,
      color: 'from-emerald-500 via-lime-400 to-teal-400'
    },
    {
      title: 'Diamond Pin Count',
      value: data?.diamondPinCount || 0,
      icon: Pin,
      color: 'from-emerald-500 via-lime-400 to-teal-400'
    },

  ];


  const copyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${data?.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard.");
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(data?.referralCode);
    toast.success("Referral code copied to clipboard.");
  }


  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 shadow-[0_18px_45px_rgba(15,23,42,0.8)] p-[1px] group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-60 blur-xl group-hover:opacity-90 transition-opacity`}
                />
                <div className="relative h-full w-full rounded-2xl bg-slate-950/90 px-5 py-4 flex flex-col gap-3">
                  <div className="pointer-events-none absolute -right-7 -top-7 h-16 w-16 rotate-45 bg-gradient-to-br from-white/10 via-green-400/60 to-transparent" />
                  <div className="pointer-events-none absolute -left-7 -bottom-7 h-16 w-16 -rotate-45 bg-gradient-to-tr from-white/10 via-yellow-400/60 to-transparent" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-gray-500/30 p-3 shadow-inner shadow-black/40">
                        <Icon className="h-6 w-6 text-[var(--btnColor)]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {stat.title}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-slate-50">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Compared to last month</span>
                    <span className="text-sky-300 group-hover:text-sky-200 transition">
                      View details →
                    </span>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>

        {
          !isPaymentDetailsAvailable && (
            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-black/40 to-orange-500/10 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(239,68,68,0.1)] mb-8">

              {/* Glow */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-start md:flex-row flex-col gap-4">
                  <div className="p-2 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Payment Details Missing
                    </h2>
                    <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                      Please update your bank account or UPI details to access withdrawals,
                      payouts, and other payment related features.
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--btnColor)] to-yellow-400 px-6 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:scale-[1.03]"
                >
                  <Link to="/profile" className="relative z-10 flex items-center justify-center gap-2">
                    Go To Profile
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                  <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </div>
            </div>
          )
        }

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <UserPayHelpQueues />
          <UserGetHelpQueues />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;