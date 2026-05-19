import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "@fluejs/noscroll";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", target: "home" },
  { name: "About Us", target: "about" },
  { name: "Features", target: "features" },
  { name: "How It Works", target: "how-it-works" },
  { name: "FAQ", target: "faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      next ? disablePageScroll() : enablePageScroll();
      return next;
    });
  };

  const closeMobileMenu = () => {
    setOpen(false);
    enablePageScroll();
  };

  const handleScroll = (target) => {
    const section = document.getElementById(target);

    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    closeMobileMenu();
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-[#04130d]/90 border-b border-emerald-500/20 shadow-[0_6px_30px_-10px_rgba(16,185,129,0.25)] backdrop-blur-xl"
          : "bg-[#04130d]/70 border-b border-white/5 backdrop-blur-md",
      ].join(" ")}
    >
      {/* TOP SOCIAL BAR */}
      <div className="w-full border-b border-emerald-500/10 bg-[#02110a] px-4 sm:px-6 lg:px-10">
        <div className="h-10 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-emerald-100/70">
            Welcome to Trendastic Ventures
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-emerald-300 hover:text-white transition"
            >
              <Facebook size={16} />
            </a>

            <a
              href="#"
              className="text-emerald-300 hover:text-white transition"
            >
              <Instagram size={16} />
            </a>

            <a
              href="#"
              className="text-emerald-300 hover:text-white transition"
            >
              <Twitter size={16} />
            </a>

            <a
              href="#"
              className="text-emerald-300 hover:text-white transition"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="w-full px-4 sm:px-6 py-3 lg:px-10 mx-auto">
        <div className="h-14 flex items-center justify-between">
          {/* LEFT LOGO */}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-3 group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-black text-xl">T</span>
            </div>

            <div className="text-left">
              <h1 className="text-white text-xl md:text-2xl font-bold leading-none">
                Trendastic
              </h1>

              <p className="text-emerald-300 text-xs tracking-widest uppercase">
                Ventures
              </p>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full border-2 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 transition font-semibold"
            >
              Login
            </button>

            {/* REGISTER */}
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:scale-[1.03] active:scale-95 transition"
            >
              Register
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggle}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => open && toggle()}
        className={[
          "lg:hidden fixed inset-0 z-40 transition",
          open
            ? "bg-black/60 backdrop-blur-[2px] opacity-100 visible"
            : "opacity-0 invisible",
        ].join(" ")}
      />

      {/* MOBILE MENU */}
      <div
        className={[
          "lg:hidden fixed top-[90px] left-0 right-0 z-50 mx-3 rounded-2xl",
          "border border-emerald-500/20 bg-[#071b13]/95 backdrop-blur-2xl",
          "transition-all duration-300",
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav className="py-4">
          <ul className="px-4 flex flex-col gap-2">
            <li className="pt-2">
              <button
                onClick={() => {
                  closeMobileMenu();
                  navigate("/login");
                }}
                className="w-full rounded-xl border border-emerald-500/30 px-4 py-3 text-emerald-300 font-semibold hover:bg-emerald-500/10 transition"
              >
                Login
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  closeMobileMenu();
                  navigate("/register");
                }}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-white font-bold shadow-lg shadow-emerald-500/30"
              >
                Register
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}