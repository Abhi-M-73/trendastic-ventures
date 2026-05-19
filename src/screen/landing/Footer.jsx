import React from "react";
import {
  Mail,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { MainContent } from "../../utils/mainContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-black via-slate-950 to-slate-black text-white overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-yellow-600/5 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 md:w-[90%] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
              <h2 className="text-xl font-bold">
                {MainContent.appName}
              </h2>
            </div>

            <h3 className="text-3xl font-bold mb-4 leading-tight">
              Community-Based
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Participation System
              </span>
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              A structured peer-to-peer system where participants follow a clear process of contributing and receiving support within a community environment.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition"
                >
                  <Icon className="w-5 h-5 text-yellow-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
              <h3 className="text-xl font-bold">
                WHY CHOOSE US
              </h3>
            </div>

            <div className="space-y-3 text-slate-300 text-sm mb-6">
              <p>• Simple and structured process</p>
              <p>• Transparent participation flow</p>
              <p>• Community-driven system</p>
              <p>• Clear step-by-step guidance</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
              <h3 className="text-xl font-bold">
                CONTACT US
              </h3>
            </div>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-yellow-400" />
                <p className="text-slate-300 text-sm">
                  {MainContent.address}
                </p>
              </div>

              <a
                href={`mailto:${MainContent.email}`}
                className="flex gap-3 hover:opacity-80"
              >
                <Mail className="w-6 h-6 text-yellow-400" />
                <p className="text-slate-300 text-sm">
                  {MainContent.email}
                </p>
              </a>

              <a
                href={MainContent.telegram_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:opacity-80"
              >
                <Send className="w-6 h-6 text-yellow-400" />
                <p className="text-slate-300 text-sm">
                  Join our community on Telegram
                </p>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-400/40 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-300">
          <p>© {currentYear} {MainContent.appName}. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-yellow-400">Privacy</a>
            <a href="#" className="hover:text-yellow-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;