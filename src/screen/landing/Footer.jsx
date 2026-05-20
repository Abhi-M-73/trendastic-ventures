import React from "react";
import {
  FaTelegramPlane,
  FaInstagram,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative bg-[#020707] overflow-hidden border-t border-teal-500/10">

      {/* GRID BG */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOW */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[92%] mx-auto relative z-10">

        {/* TOP */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-wide">
              TRENDASTIC  <br /><span className="text-teal-400">VENTURES</span>
            </h2>

            <p className="text-gray-400 leading-relaxed text-sm">
              Experience next generation AI powered betting,
              live casino, exchange games, card arena and
              ultra secure transactions with real-time action.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="w-11 h-11 rounded-2xl border border-teal-400/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-teal-300 hover:border-teal-400/30 transition-all duration-300"
              >
                <FaTelegramPlane size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl border border-teal-400/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl border border-teal-400/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-sky-400 hover:border-sky-400/30 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl border border-teal-400/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-indigo-400 hover:border-indigo-400/30 transition-all duration-300"
              >
                <FaDiscord size={18} />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm">

              <a href="#" className="hover:text-teal-300 transition-all">
                Home
              </a>

              <a href="#" className="hover:text-teal-300 transition-all">
                Sports Betting
              </a>

              <a href="#" className="hover:text-teal-300 transition-all">
                Exchange Games
              </a>

              <a href="#" className="hover:text-teal-300 transition-all">
                Live Casino
              </a>

              <a href="#" className="hover:text-teal-300 transition-all">
                Promotions
              </a>

            </div>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Platform Features
            </h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm">

              <p>⚡ Instant Withdrawals</p>
              <p>🔒 Secure Wallet System</p>
              <p>🎮 500+ Premium Games</p>
              <p>📈 Real-Time Exchange Market</p>
              <p>🤖 AI Prediction Engine</p>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white text-lg font-bold mb-5">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">

              <div className="flex items-center gap-3">
                <MdEmail className="text-teal-400 text-xl" />
                support@trendatic.com
              </div>

              <div className="p-4 rounded-3xl border border-teal-400/10 bg-white/5 backdrop-blur-xl">

                <p className="text-white font-semibold mb-2">
                  24/7 Live Support
                </p>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Our support team is available anytime for deposits,
                  withdrawals, betting assistance and account help.
                </p>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-teal-500/10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 BETNEX. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">

            <a href="#" className="hover:text-teal-300 transition-all">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-teal-300 transition-all">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-teal-300 transition-all">
              Responsible Gaming
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;