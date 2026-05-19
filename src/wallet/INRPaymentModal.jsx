import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    X,
    Upload,
    RefreshCw,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDepositDetails } from "../api/user.api";

const PAYMENT_TYPES = ["UPI", "Bank Transfer"];

const INRPaymentModal = ({
    isOpen,
    onClose,
    title = "Complete Payment",
    amount,
    apiFn,
    payload = {},
    successMessage = "Payment submitted successfully",
}) => {
    const [qrCode, setQrCode] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // ================= QR FETCH =================
    const { data, isLoading: qrLoading, refetch } = useQuery({
        queryKey: ["fetchDepositDetails"],
        queryFn: getDepositDetails,
        staleTime: 5 * 60 * 1000,
    })

    // ================= FILE =================
    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
            setScreenshotPreview(URL.createObjectURL(file));
        }
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!paymentType) {
            return toast.error("Select payment method");
        }
        if (!screenshot) {
            return toast.error("Upload payment screenshot");
        }
        try {
            setLoading(true);
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("paymentMethod", paymentType);
            formData.append("file", screenshot);
            const response = await apiFn(formData);
            if (response?.success) {
                toast.success(
                    response?.message || successMessage
                );
                onClose();
                setPaymentType("");
                setScreenshot(null);
                setScreenshotPreview(null);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Payment submission failed"
            );
        } finally {
            setLoading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md p-3 sm:p-4">

            <div className="min-h-full flex items-center justify-center py-5">

                <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 bg-[#071018] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
                    <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 bg-[#071018] shadow-[0_0_80px_rgba(0,0,0,0.9)]">

                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                        >
                            <X size={18} />
                        </button>

                        {/* GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* ================================================= */}
                            {/* LEFT SIDE */}
                            {/* ================================================= */}

                            <div className="relative overflow-hidden border-r border-white/10 bg-gradient-to-br from-[#0f172a] via-[#08111d] to-black p-8">

                                {/* GLOW */}
                                <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 blur-[120px]" />

                                <div className="relative z-10">

                                    <p className="text-yellow-400 text-xs tracking-[4px] uppercase font-semibold mb-3">
                                        Secure Payment
                                    </p>

                                    <h2 className="text-2xl font-bold text-white leading-tight">
                                        {title}
                                    </h2>

                                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

                                        <p className="text-zinc-400 text-sm mb-4 text-center">
                                            Scan QR and pay using any UPI app
                                        </p>

                                        {/* QR */}
                                        <div className="relative mx-auto w-52 h-52 rounded-3xl border border-white/10 bg-white overflow-hidden flex items-center justify-center">

                                            {qrLoading ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-xs text-zinc-500">
                                                        Loading QR...
                                                    </p>
                                                </div>
                                            ) : qrCode ? (
                                                <img
                                                    src={qrCode}
                                                    alt="QR"
                                                    className="w-full h-full object-contain p-4"
                                                />
                                            ) : (
                                                <p className="text-zinc-500 text-sm">
                                                    QR Not Available
                                                </p>
                                            )}
                                        </div>

                                        {/* REFRESH */}
                                        <button
                                            onClick={refetch}
                                            className="mt-3 mx-auto flex items-center gap-2 text-sm text-zinc-400 hover:text-yellow-400 transition-all"
                                        >
                                            <RefreshCw
                                                size={15}
                                                className={qrLoading ? "animate-spin" : ""}
                                            />
                                            Refresh QR
                                        </button>

                                        {/* AMOUNT */}
                                        <div className="mt-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-center">

                                            <p className="text-zinc-400 text-xs uppercase tracking-[3px]">
                                                Total Amount
                                            </p>

                                            <h3 className="text-4xl font-black text-yellow-400">
                                                ₹ {amount}
                                            </h3>
                                        </div>

                                        {/* FEATURES */}
                                        <div className="mt-4 space-y-3 grid grid-cols-1 md:grid-cols-2">
                                            {[
                                                "Admin verified payment",
                                                "Fast activation process",
                                            ].map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 text-sm text-zinc-300"
                                                >
                                                    <CheckCircle2
                                                        size={16}
                                                        className="text-emerald-400"
                                                    />

                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ================================================= */}
                            {/* RIGHT SIDE */}
                            {/* ================================================= */}

                            <div className="bg-gradient-to-bl from-[#0f172a] via-[#08111d] to-black p-8">

                                <div className="flex items-center gap-3 mb-8">

                                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                                        <ShieldCheck className="text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-400 text-sm">
                                            Upload Payment Proof
                                        </p>
                                        <h3 className="text-2xl font-bold text-white">
                                            Confirm Your Payment
                                        </h3>
                                    </div>
                                </div>

                                {/* PAYMENT METHODS */}
                                <div>
                                    <label className="text-xs uppercase tracking-[3px] text-zinc-500">
                                        Payment Method
                                    </label>

                                    <div className="grid grid-cols-2 gap-4 mt-3">

                                        {PAYMENT_TYPES.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setPaymentType(type)}
                                                className={`
                                            rounded-2xl border py-4 font-semibold text-sm transition-all duration-300
                                            ${paymentType === type
                                                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.15)]"
                                                        : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                                                    }
                                        `}
                                            >
                                                {type}
                                            </button>

                                        ))}
                                    </div>
                                </div>

                                {/* SCREENSHOT */}
                                <div className="mt-5">

                                    <label className="text-xs uppercase tracking-[3px] text-zinc-500">
                                        Payment Screenshot
                                    </label>

                                    <div className="relative mt-4 rounded-3xl border-2 border-dashed border-white/10 bg-white/5 overflow-hidden">

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleScreenshotChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />

                                        {screenshotPreview ? (

                                            <div className="p-5 flex items-center gap-4">

                                                <img
                                                    src={screenshotPreview}
                                                    alt="preview"
                                                    className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                                                />

                                                <div>
                                                    <p className="text-emerald-400 font-semibold text-sm">
                                                        {screenshot?.name}
                                                    </p>

                                                    <p className="text-zinc-500 text-xs mt-2">
                                                        Click to change screenshot
                                                    </p>
                                                </div>
                                            </div>

                                        ) : (

                                            <div className="p-5 text-center">

                                                <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-5">
                                                    <Upload className="text-zinc-500" />
                                                </div>

                                                <h3 className="text-white font-semibold">
                                                    Upload Payment Screenshot
                                                </h3>

                                                <p className="text-zinc-500 text-sm mt-2">
                                                    PNG, JPG, WEBP Supported
                                                </p>
                                            </div>

                                        )}
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 text-black font-black tracking-wide hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading
                                        ? "Processing..."
                                        : `Confirm Payment ₹${amount}`}
                                </button>

                                <div className="mt-4 text-center">
                                    {[
                                        "Secure payment system",
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-center gap-3 text-sm text-zinc-300"
                                        >
                                            <CheckCircle2
                                                size={16}
                                                className="text-emerald-400"
                                            />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default INRPaymentModal;