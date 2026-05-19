"use client";

import React, { useEffect, useState } from "react";

const OtpInputWithButton = ({
    label = "Email Address",
    name = "email",
    value,
    onChange,
    placeholder = "Enter your email",
    required = false,
    disabled = false,
    icon: Icon,
    buttonLabel = "Send OTP",
    onButtonClick,
    loading = false,
    className = "",
}) => {
    const [timer, setTimer] = useState(0);

    const commonInputClass =
        "bg-transparent flex-1 w-full outline-none text-white placeholder-white/70 text-sm sm:text-md disabled:cursor-not-allowed " +
        className;

    // Timer
    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer]);

    // Send OTP
    const handleSendOtp = async () => {
        if (timer > 0) return;

        const res = await onButtonClick?.();

        if (res !== false) {
            setTimer(30);
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm sm:text-md font-medium mb-2 text-gray-300"
                >
                    {label}{" "}
                    {required && (
                        <span className="text-red-500">*</span>
                    )}
                </label>
            )}

            {/* Main Container */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl p-2 border border-gray-700 transition-all duration-300 w-full">

                {/* Input Section */}
                <div className="flex items-center gap-3 flex-1 min-w-0">

                    {Icon && (
                        <div className="bg-[#252525] p-2 rounded-md shrink-0">
                            <Icon className="w-5 h-5 text-gray-300" />
                        </div>
                    )}

                    <input
                        id={name}
                        name={name}
                        type="email"
                        autoComplete="email"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className={commonInputClass}
                    />
                </div>

                {/* Button */}
                <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={disabled || loading || timer > 0}
                    className="
                        w-full 
                        sm:w-auto 
                        sm:min-w-[100px]
                        px-4 
                        py-2
                        font-semibold 
                        rounded-lg 
                        shine-effect 
                        relative 
                        bg-[var(--btnColor)] 
                        hover:bg-[var(--btnHoverColor)] 
                        text-black 
                        text-sm 
                        disabled:bg-gray-700 
                        disabled:text-gray-400 
                        disabled:cursor-not-allowed 
                        overflow-hidden 
                        inline-flex 
                        items-center 
                        justify-center 
                        gap-2 
                        transition-all 
                        duration-300
                    "
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : timer > 0 ? (
                        <span>Resend in {timer}s</span>
                    ) : (
                        <span>{buttonLabel}</span>
                    )}
                </button>
            </div>

            <style>{`
                .shine-effect::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -120%;
                    width: 120%;
                    height: 100%;
                    background: linear-gradient(
                        120deg,
                        transparent 0%,
                        rgba(255,255,255,0.25) 50%,
                        transparent 100%
                    );
                    transform: skewX(-20deg);
                }

                .shine-effect:hover::before {
                    animation: shineMove 0.9s ease-out forwards;
                }

                @keyframes shineMove {
                    0% {
                        left: -120%;
                    }
                    100% {
                        left: 120%;
                    }
                }
            `}</style>
        </div>
    );
};

export default OtpInputWithButton;