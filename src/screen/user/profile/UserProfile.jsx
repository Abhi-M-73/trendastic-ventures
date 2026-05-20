import React, { useState } from "react";
import ReusableForm from "../../../components/ui/ReusableForm";
import { useSelector } from "react-redux";
import ReusableButton from "../../../components/ui/ReusableButton";
import {
    CircleUser, Mail, PhoneCall, User, Share2, Wallet,
    Copy, Link2, LogOut, ChevronRight, Lock, FileText,
    CreditCard, BookOpen, Home, Shield, ArrowUpCircle,
    ArrowDownCircle, CheckCircle2, Save
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../../../api/user.api";
import { toast } from "react-hot-toast";
import useFetchProfile from "../../../hooks/usefetchProfile";

/* ─── small helpers ─────────────────────────────── */
const StatBox = ({ label, value, valueClass = "text-emerald-400" }) => (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4">
        <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{label}</p>
        <p className={`text-xl font-bold mt-1 ${valueClass}`}>{value}</p>
    </div>
);

const FieldRow = ({ icon: Icon, label, value, suffix }) => (
    <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
        <Icon size={16} className="text-emerald-400 shrink-0" />
        <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5 truncate">{value}</p>
        </div>
        {suffix}
    </div>
);

const MenuItem = ({ icon: Icon, title, desc }) => (
    <div className="group flex items-center gap-4 px-5 py-4 border-b border-white/[0.05] last:border-b-0 hover:bg-emerald-500/[0.06] transition-colors cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200">{title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
    </div>
);

/* ─── main component ─────────────────────────────── */
const UserProfile = () => {
    const { fetchProfile } = useFetchProfile();
    const userInfo = useSelector((state) => state.auth?.user);

    const [formData, setFormData] = useState({
        name: userInfo?.name || "",
        username: userInfo?.username || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        sponsorCode: userInfo?.parentReferedCode || "N/A",
        referralCode: userInfo?.referralCode || "",
        walletAddress: userInfo?.walletAddress || "",
        profileImage: userInfo?.profileImage || null,
    });

    const [bankDetails, setBankDetails] = useState({
        bankName: userInfo?.bankName || "",
        accountNumber: userInfo?.accountNumber || "",
        upiId: userInfo?.upiId || "",
        ifscCode: userInfo?.IFSCCode || "",
        googlePayNumber: userInfo?.googlePayNumber || "",
        phonePayNumber: userInfo?.phonePayNumber || "",
        walletAddress: userInfo?.walletAddress || "",
    });

    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleBankInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({
            ...prev,
            [name]: name === "ifscCode" ? value.toUpperCase() : value,
        }));
    };

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (data) => updateUserProfile(data),
        onSuccess: (data) => {
            toast.success(data?.message || "Profile updated successfully!");
            fetchProfile();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update profile.");
        },
    });

    const handleUpdateBankDetails = () => {
        const fd = new FormData();
        fd.append("bankName", bankDetails.bankName);
        fd.append("accountNumber", bankDetails.accountNumber);
        fd.append("upiId", bankDetails.upiId);
        fd.append("IFSCCode", bankDetails.ifscCode);
        fd.append("googlePayNumber", bankDetails.googlePayNumber);
        fd.append("phonePayNumber", bankDetails.phonePayNumber);
        fd.append("walletAddress", bankDetails.walletAddress);
        updateProfile(fd);
    };

    /* derived */
    const isActive = Boolean(userInfo?.isVerified);
    const joinedDate = userInfo?.createdAt
        ? new Date(userInfo.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
        : "—";

    const copyReferralCode = () => {
        navigator.clipboard.writeText(userInfo?.referralCode);
        toast.success("Referral code copied!");
    };

    const copyReferralLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/register?ref=${userInfo?.referralCode}`);
        toast.success("Referral link copied!");
    };

    const initials = userInfo?.username?.charAt(0)?.toUpperCase() ?? "U";

    return (
        <div className="flex flex-col gap-4 font-sans p-5">
            <div className="bg-[#0f1f18] border border-emerald-500/15 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-5">
                    <div className="relative shrink-0">
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center border-[3px] border-emerald-500/30 shadow-lg">
                            {userInfo?.profileImage
                                ? <img src={userInfo.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                : <span className="text-2xl font-bold text-white">{initials}</span>}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-slate-100">{userInfo?.username || "User Name"}</h2>
                        <p className="text-sm font-semibold text-slate-300 mt-0.5">{joinedDate}</p>
                    </div>

                    <div className="text-right shrink-0">
                        <p className="text-lg text-slate-300  tracking-wider font-semibold">Change Password</p>
                    </div>
                </div>

                <div className="border-t border-white/[0.07] mx-5" />

                {/* Stats grid */}
                <div className="p-5">
                    <div className="flex items-center justify-between bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl p-5 gap-4">
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Wallet Balance</p>
                            <p className="text-4xl font-bold text-emerald-400 mt-2 tracking-tight">
                                ₹ {userInfo?.walletBalance || 0}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5">
                                <ArrowUpCircle size={15} /> Deposit
                            </button>
                            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5">
                                <ArrowDownCircle size={15} /> Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f1f18] border border-emerald-500/15 rounded-2xl p-5">
                    <h2 className="text-base font-bold text-slate-100">Profile Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5 mb-4">Your account information</p>
                    <div className="flex flex-col gap-2.5">
                        <FieldRow icon={User} label="Userid" value={formData.username || "—"} />
                        <FieldRow icon={PhoneCall} label="Phone" value={formData.phone || "—"} />
                        <FieldRow
                            icon={Link2}
                            label="Referral Link"
                            value={`${window.location.origin}/register?ref=${userInfo?.referralCode}`}
                            suffix={
                                <button onClick={copyReferralLink} className="shrink-0 p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors">
                                    <Copy size={13} className="text-emerald-400" />
                                </button>
                            }
                        />
                    </div>
                </div>

                <div className="bg-[#0f1f18] border border-emerald-500/15 rounded-2xl overflow-hidden">
                    <div className="px-5 pt-4 pb-2">
                        <h2 className="text-base font-bold text-slate-100">Quick Access</h2>
                    </div>
                    <MenuItem icon={Shield} title="Active Bets" desc="View all running bets" />
                    <MenuItem icon={FileText} title="Account Statement" desc="Check all transactions" />
                    <MenuItem icon={CreditCard} title="Deposit / Withdraw Report" desc="Track payment history" />
                    <MenuItem icon={BookOpen} title="Rules" desc="Read betting guidelines" />
                    <MenuItem icon={Home} title="Banking" desc="Manage bank details" />
                </div>
            </div>

            {/* ── LOGOUT ── */}
            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm hover:bg-red-500/20 transition-colors">
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
};

export default UserProfile;