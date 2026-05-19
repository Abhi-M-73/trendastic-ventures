import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, UserCircle2 } from 'lucide-react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import { useLocation } from "react-router-dom";
const DashboardHeader = () => {
  const { role, username, email, profileImage } = useSelector((state) => state?.auth?.user) || {};
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const last = location.pathname.split("/").pop();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(logout());
      navigate('/');
    }, 1000);
  };


  if (loading) return <Loader />;

  return (
    <div className="bg-black/60 sticky top-0 z-30 backdrop-blur-2xl border-b border-gray-700 shadow-sm w-full">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        {/* Small screen pe column, bade screen pe row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
          <div className="min-w-0 hidden sm:block">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100 truncate">
              <span className="text-[var(--btnColor)]">
                {last && `  ${last.charAt(0).toUpperCase() + last.slice(1)}`}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">{currentDate}</p>
          </div>

          {/* RIGHT SIDE ICONS + PROFILE */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 relative flex-wrap">
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-lg text-white hover:text-black hover:bg-gray-100 transition-colors shrink-0"
            >
              {isFullscreen ? (
                <AiOutlineFullscreenExit className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <AiOutlineFullscreen className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* <button className="relative p-1.5 sm:p-2 rounded-lg text-white hover:text-black hover:bg-gray-100 transition-colors shrink-0">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
            </button> */}

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  username?.charAt(0).toUpperCase() || "A"
                )}
              </div>
            </button>

            {open && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-12 sm:top-14 w-56 sm:w-60 mainBgColor backdrop-blur-2xl shadow-xl rounded-xl border border-gray-200 p-3 sm:p-4 z-40"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      username?.charAt(0).toUpperCase() || "A"
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base text-white truncate">{role === "user" ? username : "Admin"}</p>
                    <p className="text-xs sm:text-sm text-gray-300 truncate">{email}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <Link to="/profile" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-gray-800 text-gray-300 text-md">
                    <UserCircle2 className="w-5 h-5" /> Profile
                  </Link>

                  <button
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 text-md"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
