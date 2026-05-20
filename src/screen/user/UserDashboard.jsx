import React from 'react';
import { TrendingUp, DollarSign, CreditCard, Wallet, PiggyBank, ArrowUpRight, ArrowDownRight, Calendar, Award, Target, Activity, User, Copy, Users, ShoppingCart, TrendingUpDown, ArrowBigUpDash, ArrowBigDownDash, Recycle, Network, Pin, IndianRupee, HandCoins } from 'lucide-react';
import { backendConfig, MainContent } from '../../utils/mainContent';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useFetchProfile from '../../hooks/usefetchProfile';
import { useEffect } from 'react';
import { isBoolean } from 'lodash';
import { Link } from 'react-router-dom';
import BannerSlider from '../../components/ui/BannerSlider';
import SportOdds from './SportOdds';

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
      <BannerSlider />
      <div>
        <SportOdds />
      </div>
    </div>
  );
};

export default UserDashboard;