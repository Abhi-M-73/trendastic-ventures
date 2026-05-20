import React, { useState } from "react";

const UserNotifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Deposit Successful",
      message: "₹5,000 has been added to your wallet successfully.",
      time: "2 min ago",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      title: "Bet Won 🎉",
      message: "Congratulations! You won ₹2,500 in Cricket Match.",
      time: "1 hour ago",
      type: "win",
      unread: true,
    },
    {
      id: 3,
      title: "Withdrawal Pending",
      message: "Your withdrawal request is under review.",
      time: "3 hours ago",
      type: "pending",
      unread: false,
    },
    {
      id: 4,
      title: "Account Security",
      message: "Your account password was changed successfully.",
      time: "Yesterday",
      type: "security",
      unread: false,
    },
  ]);

  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return "border-green-500/20 bg-green-500/10";
      case "win":
        return "border-yellow-500/20 bg-yellow-500/10";
      case "pending":
        return "border-orange-500/20 bg-orange-500/10";
      case "security":
        return "border-blue-500/20 bg-blue-500/10";
      default:
        return "border-white/10 bg-white/5";
    }
  };

  return (
    <div className="w-full p-5">
      <div className="w-full mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Notifications
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Stay updated with your latest activities
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black text-sm font-semibold">
            Mark All Read
          </button>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="p-4 space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 ${getNotificationStyle(
                item.type
              )}`}
            >
              {/* UNREAD DOT */}
              {item.unread && (
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              )}

              <div className="flex items-start gap-4">

                {/* ICON */}
                <div className="w-14 h-14 rounded-2xl bg-black/30 flex items-center justify-center text-2xl">
                  {item.type === "success" && "💰"}
                  {item.type === "win" && "🏆"}
                  {item.type === "pending" && "⏳"}
                  {item.type === "security" && "🔐"}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <span className="text-xs text-gray-400">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {notifications.length === 0 && (
          <div className="h-[350px] flex items-center justify-center text-center p-5">
            <div>
              <div className="text-6xl mb-4">🔔</div>

              <h3 className="text-2xl font-bold text-white">
                No Notifications
              </h3>

              <p className="text-gray-400 mt-2">
                You're all caught up for now.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;