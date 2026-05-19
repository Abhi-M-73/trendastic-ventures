import React, { useState } from "react";
import ReusableButton from "../../../components/ui/ReusableButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { raiseTicket } from "../../../api/user.api";
import {
  Bot,
  FileText,
  MessageCircle,
  UploadCloud,
  HelpCircle,
  Zap,
  ShieldCheck,
  Clock3,
  Paperclip,
  X,
  ChevronRight,
} from "lucide-react";

/* ─── tiny reusable field ─── */
const Field = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold tracking-widest uppercase text-slate-400 flex items-center gap-1">
      {label}
      {required && <span className="text-emerald-400">*</span>}
    </label>
    {children}
  </div>
);

const inputBase =
  "w-full bg-black/5 border border-slate-700/70 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[var(--btnColor)]/40 focus:ring-2 focus:ring-[var(--btnColor)]/10";

const UserRaiseTicket = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    attachments: [],
  });

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const fileArray = Array.from(files || []);
      setFormData((prev) => ({ ...prev, attachments: fileArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: raiseTicket,
    onSuccess: (data) => {
      toast.success(data?.message || "Ticket raised successfully!");
      setFormData({ subject: "", message: "", attachments: [] });
      queryClient.invalidateQueries({ queryKey: ["raiseTicketHistory"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Ticket raise failed. Please try again."
      );
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message)
      return toast.error("Please fill in all required fields.");

    const form = new FormData();
    form.append("subject", formData.subject);
    form.append("message", formData.message);
    formData.attachments.forEach((file) => form.append("file", file));
    mutate(form);
  };

  const perks = [
    { icon: Zap, title: "Fast response", desc: "Avg. reply within 2–4 hours" },
    { icon: ShieldCheck, title: "Secure & private", desc: "Your data stays protected" },
    { icon: Clock3, title: "24 / 7 support", desc: "We're here round the clock" },
  ];

  return (
    <div className="w-full mx-auto">

      {/* ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative w-full">

        {/* ── top accent bar ── */}
        <div className="h-[2px] w-full rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--btnColor)] to-transparent mb-0" />

        {/* ── main card ── */}
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-b-2xl rounded-t-2xl overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.6fr]">
            <div className="relative md:flex flex-col justify-between gap-8 p-8 bg-white/5 border-b lg:border-b-0 lg:border-r border-slate-800/60 overflow-hidden rounded-l-2xl hidden">

             
              {/* avatar */}
              <div className="relative w-fit">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[var(--btnColor)]/10 via-[var(--btnColor)]/50 to-[var(--btnColor)]/200 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <span className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-lg bg-gradient-to-br from-[var(--btnColor)]/10 via-[var(--btnColor)]/50 to-[var(--btnColor)]/200 flex items-center justify-center shadow-md">
                  <HelpCircle className="h-4 w-4 text-white" />
                </span>
              </div>

              {/* heading */}
              <div className="space-y-2">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--btnColor)]">
                  Support Center
                </p>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  We're here<br />to help you
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Describe your issue clearly and attach any screenshots. Our team will get back to you shortly.
                </p>
              </div>

              {/* perks */}
              <div className="space-y-3">
                {perks.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{title}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* bottom tag */}
              <p className="text-[11px] text-slate-600 font-mono">
                TICKET_SYSTEM · v2.4
              </p>
            </div>

            {/* ────── RIGHT PANEL (FORM) ────── */}
            <div className="p-8 space-y-7">

              <div className="space-y-1">
                <h1 className="text-xl font-bold text-white">
                  Raise a Support Ticket
                </h1>
                <p className="text-sm text-slate-400">
                  Fill in the details below — be specific for a faster resolution.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">

                {/* Subject */}
                <Field label="Subject" required>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Withdrawal not processed"
                      className={`${inputBase} pl-10`}
                    />
                  </div>
                </Field>

                {/* Message */}
                <Field label="Message / Description" required>
                  <div className="relative">
                    <MessageCircle className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      className={`${inputBase} pl-10 resize-none`}
                    />
                  </div>
                </Field>

                {/* File Upload */}
                <Field label="Attachments (optional)">
                  <label className="group flex items-center gap-3 w-full bg-white/5 border border-dashed border-slate-700/90 hover:border-[var(--btnColor)]/50 rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200">
                    <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-white/5 group-hover:bg-[var(--btnColor)]/10 border border-slate-700 group-hover:border-[var(--btnColor)]/30 flex items-center justify-center transition-all">
                      <UploadCloud className="h-4 w-4 text-slate-400 group-hover:text-[var(--btnColor)] transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 font-medium">Click to upload files</p>
                      <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      name="attachments"
                      multiple
                      onChange={handleInputChange}
                      className="hidden"
                    />
                  </label>

                  {/* file chips */}
                  {formData.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.attachments.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-white/5 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                        >
                          <Paperclip className="h-3 w-3 text-[var(--btnColor)]" />
                          <span className="max-w-[120px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="ml-1 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>

                {/* Submit */}
                <div className="w-full mt-4">
                  <ReusableButton
                    label={isPending ? "Submitting..." : "Submit Ticket"}
                    onClick={handleFormSubmit}
                    loading={isPending}
                    disabled={isPending}
                    icon={HelpCircle}
                    variant="primary"
                    type="button"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRaiseTicket;