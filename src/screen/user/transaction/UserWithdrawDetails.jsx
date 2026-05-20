import React, { useState, useRef } from "react";
import {
    User, CreditCard, CheckCheck, Home, Phone,
    Lock, ShieldCheck, CheckCircle2, RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";
// import { useMutation } from "@tanstack/react-query";
// import { addBankAccount, sendWithdrawOtp } from "../../../api/user.api";

const IFSC_RE = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const Field = ({ label, icon: Icon, error, success, children }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            {label}
        </label>
        <div
            className={`flex items-center bg-white/[0.04] border rounded-xl overflow-hidden transition-colors
        focus-within:border-emerald-500/50
        ${error ? "border-red-500/40" : success ? "border-emerald-500/35" : "border-white/[0.09]"}`}
        >
            <div className="w-10 flex items-center justify-center text-emerald-400 shrink-0">
                <Icon size={15} />
            </div>
            {children}
        </div>
        {error && <p className="text-[10px] text-red-400 mt-0.5">{error}</p>}
    </div>
);

const inp = "flex-1 bg-transparent outline-none text-[13px] font-medium text-slate-200 placeholder:text-slate-700 py-[11px] pr-3";

const UserWithdrawDetails = () => {
    const [form, setForm] = useState({
        holderName: "",
        accountNumber: "",
        confirmAccount: "",
        ifscCode: "",
        phone: "",
        otp: "",
    });
    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const val = name === "ifscCode" ? value.toUpperCase() : value;
        const updated = { ...form, [name]: val };
        setForm(updated);

        // inline validation
        const errs = { ...errors };
        if (name === "holderName") errs.holderName = val.trim().length < 3 ? "Min 3 characters" : "";
        if (name === "accountNumber") errs.accountNumber = val.length < 8 ? "Min 8 digits" : "";
        if (name === "confirmAccount")
            errs.confirmAccount = val && updated.accountNumber !== val ? "Numbers do not match" : "";
        if (name === "accountNumber" && form.confirmAccount)
            errs.confirmAccount = form.confirmAccount !== val ? "Numbers do not match" : "";
        if (name === "ifscCode")
            errs.ifscCode = val.length > 0 && !IFSC_RE.test(val) ? "Invalid IFSC (e.g. SBIN0001234)" : "";
        if (name === "phone") errs.phone = val.length > 0 && val.length !== 10 ? "Enter 10-digit number" : "";
        setErrors(errs);
    };

    const startTimer = () => {
        setTimer(30);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) { clearInterval(timerRef.current); return 0; }
                return t - 1;
            });
        }, 1000);
    };

    const handleSendOtp = () => {
        if (form.phone.length !== 10) return;
        setOtpSent(true);
        toast.success("OTP sent to +91 " + form.phone);
        startTimer();
        // API: sendWithdrawOtp({ phone: form.phone })
    };

    const phoneOk = form.phone.length === 10;
    const canSend = phoneOk && (!otpSent || timer === 0);
    const allValid =
        form.holderName.trim().length >= 3 &&
        form.accountNumber.length >= 8 &&
        form.accountNumber === form.confirmAccount &&
        IFSC_RE.test(form.ifscCode) &&
        phoneOk &&
        otpSent &&
        form.otp.length === 6;

    const handleSubmit = () => {
        if (!allValid) return;
        // API: addBankAccount({ ...form })
        toast.success("Bank account saved successfully!");
    };

    return (
        <div className="p-5">
            <div className="bg-[#000000] border border-emerald-500/15 rounded-2xl overflow-hidden">

                {/* header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <CreditCard size={16} className="text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-[15px] font-bold text-slate-100">Add Bank Account</h2>
                        <p className="text-[11px] text-slate-300">Link your bank account for withdrawals</p>
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-4">

                    {/* security note */}
                    <div className="flex items-center gap-2.5 bg-emerald-500/[0.05] border border-emerald-500/[0.1] rounded-xl px-3 py-2.5">
                        <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                            Your bank details are encrypted and used only for withdrawals.
                        </p>
                    </div>

                    {/* holder name */}
                    <Field label="Account Holder Name" icon={User} error={errors.holderName}>
                        <input className={inp} type="text" name="holderName" value={form.holderName}
                            onChange={handleChange} placeholder="Full name as per bank records" />
                    </Field>

                    {/* acc + confirm */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Account Number" icon={CreditCard} error={errors.accountNumber}>
                            <input className={inp} type="number" name="accountNumber" value={form.accountNumber}
                                onChange={handleChange} placeholder="Account number" />
                        </Field>

                        <Field
                            label="Confirm Account Number" icon={CheckCheck}
                            error={errors.confirmAccount}
                            success={form.confirmAccount && form.accountNumber === form.confirmAccount}
                        >
                            <input className={inp} type="number" name="confirmAccount" value={form.confirmAccount}
                                onChange={handleChange} placeholder="Re-enter number" />
                        </Field>
                    </div>

                    {/* ifsc */}
                    <Field label="IFSC Code" icon={Home} error={errors.ifscCode}>
                        <input
                            className={`${inp} uppercase tracking-widest font-mono`}
                            type="text" name="ifscCode" value={form.ifscCode}
                            onChange={handleChange} maxLength={11} placeholder="e.g. SBIN0001234"
                        />
                    </Field>

                    <hr className="border-white/[0.06]" />

                    {/* phone + send otp */}
                    <Field label="Mobile Number" icon={Phone} error={errors.phone}>
                        <input className={inp} type="number" name="phone" value={form.phone}
                            onChange={handleChange} placeholder="10-digit mobile number" />
                        <button
                            onClick={handleSendOtp}
                            disabled={!canSend}
                            className="px-3 self-stretch border-l border-white/[0.08] text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:text-slate-600 disabled:cursor-not-allowed disabled:bg-transparent transition-colors whitespace-nowrap"
                        >
                            {timer > 0 ? `${timer}s` : otpSent ? "Resend" : "Send OTP"}
                        </button>
                    </Field>

                    {otpSent && (
                        <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 -mt-1">
                            <CheckCircle2 size={11} /> OTP sent to +91 {form.phone}
                        </p>
                    )}

                    {/* otp field - shown after send */}
                    {otpSent && (
                        <Field label="Enter OTP" icon={Lock}>
                            <input
                                className={inp} type="number" name="otp" value={form.otp}
                                onChange={handleChange} maxLength={6} placeholder="Enter 6-digit OTP"
                            />
                            {timer > 0 ? (
                                <span className="pr-3 text-[11px] font-bold text-slate-300 whitespace-nowrap">
                                    {timer}s
                                </span>
                            ) : (
                                <button
                                    onClick={handleSendOtp}
                                    className="pr-3 text-[11px] font-bold text-emerald-400 flex items-center gap-1 hover:text-emerald-300 transition-colors whitespace-nowrap"
                                >
                                    <RefreshCw size={10} /> Resend
                                </button>
                            )}
                        </Field>
                    )}

                    {/* submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={!allValid}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-[13px] py-3.5 rounded-xl mt-1 hover:opacity-90 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <CheckCircle2 size={15} />
                        Save Bank Account
                    </button>

                </div>
            </div>
       </div>
    );
};

export default UserWithdrawDetails;