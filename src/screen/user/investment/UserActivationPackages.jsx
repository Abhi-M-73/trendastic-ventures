// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getActivationPackages, userDepositApi } from "../../../api/user.api";
// import {
//     Medal,
//     Crown,
//     Diamond,
//     Lock,
//     Loader2,
//     Sparkles,
//     CheckCircle2,
// } from "lucide-react";
// import INRPaymentModal from "../../../wallet/INRPaymentModal";

// const packageMeta = {
//     "Silver Pin": {
//         icon: Medal,
//         label: "Silver",
//         gradient:
//             "from-slate-800 via-zinc-900 to-slate-950",
//         glow: "shadow-[0_0_35px_rgba(148,163,184,0.15)]",
//         iconBg: "bg-slate-500/20",
//         iconColor: "text-slate-300",
//         accent: "from-slate-300 to-white",
//         badge:
//             "bg-slate-400/20 text-slate-200 border border-slate-300/20",
//         button:
//             "bg-gradient-to-r from-slate-400 to-slate-200 text-black hover:scale-[1.02]",
//     },

//     "Gold Pin": {
//         icon: Crown,
//         label: "Gold",
//         gradient:
//             "from-[#2a1800] via-[#1a1200] to-black",
//         glow: "shadow-[0_0_40px_rgba(251,191,36,0.15)]",
//         iconBg: "bg-yellow-400/20",
//         iconColor: "text-yellow-300",
//         accent: "from-yellow-300 to-amber-500",
//         badge:
//             "bg-yellow-400/20 text-yellow-200 border border-yellow-300/30",
//         button:
//             "bg-gradient-to-r from-yellow-300 to-amber-500 text-black hover:scale-[1.02]",
//     },

//     "Diamond Pin": {
//         icon: Diamond,
//         label: "Diamond",
//         gradient:
//             "from-[#071421] via-[#0f172a] to-black",
//         glow: "shadow-[0_0_45px_rgba(59,130,246,0.15)]",
//         iconBg: "bg-blue-500/20",
//         iconColor: "text-cyan-300",
//         accent: "from-cyan-300 to-blue-500",
//         badge:
//             "bg-cyan-400/20 text-cyan-200 border border-cyan-300/30",
//         button:
//             "bg-gradient-to-r from-cyan-300 to-blue-500 text-black hover:scale-[1.02]",
//     },
// };

// const PackageCard = ({ pkg, handleOpenPaymentModel }) => {
//     const meta = packageMeta[pkg.name] || packageMeta["Silver Pin"];
//     const Icon = meta.icon;

//     return (
//         <div
//             className={`
//                 relative overflow-hidden rounded-3xl border border-white/10
//                 bg-gradient-to-br ${meta.gradient}
//                 p-[1px] transition-all duration-500
//                 hover:-translate-y-2 hover:border-white/20
//                 ${meta.glow}
//                 group
//             `}
//         >
//             {/* Glow Effect */}
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
//                 <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
//             </div>

//             {/* Inner Card */}
//             <div className="relative h-full rounded-3xl bg-black/40 backdrop-blur-xl p-6 flex flex-col">
//                 <div className="flex items-start justify-between mb-6">
//                     <div
//                         className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.iconBg} backdrop-blur-md`}
//                     >
//                         <Icon size={28} className={meta.iconColor} />
//                     </div>

//                     <div
//                         className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${meta.badge}`}
//                     >
//                         {meta.label}
//                     </div>
//                 </div>

//                 {/* Name */}
//                 <div className="mb-5">
//                     <h2 className="text-2xl font-extrabold text-white mb-1">
//                         {pkg.name}
//                     </h2>
//                     <p className="text-zinc-400 text-sm">
//                         Unlock premium earning benefits
//                     </p>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-6">
//                     <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
//                         Investment Amount
//                     </p>
//                     <h3
//                         className={`text-4xl font-black bg-gradient-to-r ${meta.accent} bg-clip-text text-transparent`}
//                     >
//                         ₹ {pkg.price}
//                     </h3>
//                 </div>

//                 {/* Features */}
//                 <div className="space-y-3 mb-7 flex-1">
//                     {[
//                         "Instant Activation",
//                         "Premium Rewards",
//                         "Secure Transactions",
//                     ].map((feature, i) => (
//                         <div
//                             key={i}
//                             className="flex items-center gap-3 text-sm text-zinc-300"
//                         >
//                             <CheckCircle2
//                                 size={16}
//                                 className={meta.iconColor}
//                             />
//                             {feature}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Button */}
//                 {pkg.isActive ? (
//                     <button
//                         onClick={() => handleOpenPaymentModel(pkg)}
//                         className={`
//                             w-full py-3 rounded-2xl font-bold text-sm
//                             transition-all duration-300
//                             flex items-center justify-center gap-2
//                             shadow-lg
//                             ${meta.button}
//                         `}
//                     >
//                         <Sparkles size={16} />
//                         Buy Premium Package
//                     </button>
//                 ) : (
//                     <button
//                         disabled
//                         className="w-full py-3 rounded-2xl font-bold text-sm bg-white/5 border border-white/10 text-zinc-500 cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                         <Lock size={15} />
//                         Coming Soon
//                     </button>
//                 )}
//             </div>

//             {/* Bottom Ribbon */}
//             {!pkg.isActive && (
//                 <div className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-bold tracking-widest uppercase text-zinc-400 bg-white/5 backdrop-blur-md py-2 border-t border-white/10">
//                     🔒 Exclusive Package Launching Soon
//                 </div>
//             )}
//         </div>
//     );
// };

// const UserActivationPackages = () => {
//     const [openBuyModal, setOpenBuyModal] = useState(false);
//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const { data, isLoading } = useQuery({
//         queryKey: ["getActivationPackages"],
//         queryFn: getActivationPackages,
//         staleTime: 5 * 60 * 1000,
//     });

//     const handleOpenPaymentModel = (pkg) => {
//         setOpenBuyModal(true);
//         setSelectedPackage(pkg);
//     }

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center py-20">
//                 <div className="w-16 h-16 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin flex items-center justify-center">
//                     <Loader2 className="text-yellow-400 w-6 h-6 animate-spin" />
//                 </div>
//             </div>
//         );
//     }

//     const packages = data?.data || [];

//     return (
//         <div className="relative">
//             <div className="absolute top-0 left-1/2 -translate-x-1/2  bg-yellow-500/10 blur-[120px] rounded-full"></div>
//             <div className="text-center mb-10 relative z-10">
//                 <h1 className="text-3xl font-semibold text-white mb-3">
//                     Premium Activation Packages
//                 </h1>
//                 <div className="flex items-center justify-center gap-3 mt-6">
//                     <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-yellow-400"></span>
//                     <div className="w-3 h-3 rotate-45 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
//                     <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-yellow-400"></span>
//                 </div>
//             </div>

//             {/* Cards */}
//             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
//                 {packages.map((pkg) => (
//                     <PackageCard key={pkg._id} pkg={pkg} handleOpenPaymentModel={handleOpenPaymentModel} />
//                 ))}
//             </div>

//             <INRPaymentModal
//                 isOpen={openBuyModal}
//                 onClose={() => setOpenBuyModal(false)}
//                 title="Buy Premium Package"
//                 amount={selectedPackage?.price}
//                 apiFn={userDepositApi}
//                 payload={{
//                     packageId: selectedPackage?._id,
//                     packageName: selectedPackage?.name,
//                     investmentAmount: selectedPackage?.price,
//                 }}
//             />
//         </div>
//     );
// };

// export default UserActivationPackages;






import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getActivationPackages,
    activatePinApi,
} from "../../../api/user.api";

import {
    Medal,
    Crown,
    Diamond,
    Lock,
    Loader2,
    Sparkles,
    CheckCircle2,
    X,
    Gem,
} from "lucide-react";
import toast from "react-hot-toast";

const packageMeta = {
    "Silver Pin": {
        icon: Medal,
        label: "Silver",
        gradient: "from-slate-800 via-zinc-900 to-slate-950",
        glow: "shadow-[0_0_35px_rgba(148,163,184,0.15)]",
        iconBg: "bg-slate-500/20",
        iconColor: "text-slate-300",
        accent: "from-slate-300 to-white",
        badge:
            "bg-slate-400/20 text-slate-200 border border-slate-300/20",
        button:
            "bg-gradient-to-r from-slate-400 to-slate-200 text-black hover:scale-[1.02]",
    },

    "Gold Pin": {
        icon: Crown,
        label: "Gold",
        gradient: "from-[#2a1800] via-[#1a1200] to-black",
        glow: "shadow-[0_0_40px_rgba(251,191,36,0.15)]",
        iconBg: "bg-yellow-400/20",
        iconColor: "text-yellow-300",
        accent: "from-yellow-300 to-amber-500",
        badge:
            "bg-yellow-400/20 text-yellow-200 border border-yellow-300/30",
        button:
            "bg-gradient-to-r from-yellow-300 to-amber-500 text-black hover:scale-[1.02]",
    },

    "Diamond Pin": {
        icon: Diamond,
        label: "Diamond",
        gradient: "from-[#071421] via-[#0f172a] to-black",
        glow: "shadow-[0_0_45px_rgba(59,130,246,0.15)]",
        iconBg: "bg-blue-500/20",
        iconColor: "text-cyan-300",
        accent: "from-cyan-300 to-blue-500",
        badge:
            "bg-cyan-400/20 text-cyan-200 border border-cyan-300/30",
        button:
            "bg-gradient-to-r from-cyan-300 to-blue-500 text-black hover:scale-[1.02]",
    },

    // "Ruby Pin": {
    //     icon: Gem,
    //     label: "Ruby",
    //     gradient: "from-[#2b0000] via-[#450a0a] to-black",
    //     glow: "shadow-[0_0_45px_rgba(239,68,68,0.18)]",
    //     iconBg: "bg-red-500/20",
    //     iconColor: "text-red-300",
    //     accent: "from-red-300 to-rose-600",
    //     badge:
    //         "bg-red-400/20 text-red-200 border border-red-300/30",
    //     button:
    //         "bg-gradient-to-r from-red-400 to-rose-600 text-white hover:scale-[1.02]",
    // },
};

const PackageCard = ({ pkg, handleOpenPopup }) => {
    const meta = packageMeta[pkg.name] || packageMeta["Silver Pin"];
    const Icon = meta.icon;

    return (
        <div
            className={`
                relative overflow-hidden rounded-3xl border border-white/10
                bg-gradient-to-br ${meta.gradient}
                p-[1px] transition-all duration-500
                hover:-translate-y-2 hover:border-white/20
                ${meta.glow}
                group
            `}
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
            </div>

            <div className="relative h-full rounded-3xl bg-black/40 backdrop-blur-xl p-6 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.iconBg} backdrop-blur-md`}
                    >
                        <Icon size={28} className={meta.iconColor} />
                    </div>

                    <div
                        className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${meta.badge}`}
                    >
                        {meta.label}
                    </div>
                </div>

                <div className="mb-5">
                    <h2 className="text-2xl font-extrabold text-white mb-1">
                        {pkg.name}
                    </h2>

                    <p className="text-zinc-400 text-sm">
                        Unlock premium earning benefits
                    </p>
                </div>

                <div className="mb-6">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                        Investment Amount
                    </p>

                    <h3
                        className={`text-4xl font-black bg-gradient-to-r ${meta.accent} bg-clip-text text-transparent`}
                    >
                        ₹ {pkg.price}
                    </h3>
                </div>

                <div className="space-y-3 mb-7 flex-1">
                    {[
                        "Instant Activation",
                        "Premium Rewards",
                        "Secure Transactions",
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-sm text-zinc-300"
                        >
                            <CheckCircle2
                                size={16}
                                className={meta.iconColor}
                            />
                            {feature}
                        </div>
                    ))}
                </div>

                {pkg.isActive ? (
                    <button
                        onClick={() => handleOpenPopup(pkg)}
                        className={`
                            w-full py-3 rounded-2xl font-bold text-sm
                            transition-all duration-300
                            flex items-center justify-center gap-2
                            shadow-lg
                            ${meta.button}
                        `}
                    >
                        <Sparkles size={16} />
                        Activate Pin
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full py-3 rounded-2xl font-bold text-sm bg-white/5 border border-white/10 text-zinc-500 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Lock size={15} />
                        Coming Soon
                    </button>
                )}
            </div>

            {!pkg.isActive && (
                <div className="absolute bottom-0 left-0 right-0 text-center text-[11px] font-bold tracking-widest uppercase text-zinc-400 bg-white/5 backdrop-blur-md py-2 border-t border-white/10">
                    🔒 Exclusive Package Launching Soon
                </div>
            )}
        </div>
    );
};

const UserActivationPackages = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [userId, setUserId] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["getActivationPackages"],
        queryFn: getActivationPackages,
        staleTime: 5 * 60 * 1000,
    });

    const queryClient = useQueryClient();
    const activateMutation = useMutation({
        mutationFn: (payload) => activatePinApi(payload),

        onSuccess: (res) => {
            toast.success(res?.message || "Pin Activated Successfully");
            queryClient.invalidateQueries({ queryKey: ["getActivatedPinHistory"] });
            setOpenModal(false);
            setUserId("");
        },

        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Something went wrong"
            );
        },
    });

    const handleOpenPopup = (pkg) => {
        setSelectedPackage(pkg);
        setOpenModal(true);
    };

    const handleSubmit = () => {
        if (!userId) {
            return toast.error("Please enter User ID");
        }

        activateMutation.mutate({
            username: userId,
            packageId: selectedPackage?._id,
            pinType: selectedPackage?.name,
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin flex items-center justify-center">
                    <Loader2 className="text-yellow-400 w-6 h-6 animate-spin" />
                </div>
            </div>
        );
    }

    const packages = data?.data || [];

    return (
        <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-500/10 blur-[120px] rounded-full"></div>

            <div className="text-center mb-10 relative z-10">
                <h1 className="text-3xl font-semibold text-white mb-3">
                    Premium Activation Packages
                </h1>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {packages.map((pkg) => (
                    <PackageCard
                        key={pkg._id}
                        pkg={pkg}
                        handleOpenPopup={handleOpenPopup}
                    />
                ))}
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f0f] p-6 relative">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Activate Pin
                        </h2>

                        <p className="text-zinc-400 text-sm mb-6">
                            Enter Username to activate package
                        </p>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white outline-none focus:border-yellow-400"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={activateMutation.isPending}
                            className="w-full mt-5 h-12 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold flex items-center justify-center gap-2"
                        >
                            {activateMutation.isPending ? (
                                <>
                                    <Loader2
                                        className="animate-spin"
                                        size={18}
                                    />
                                    Processing...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserActivationPackages;