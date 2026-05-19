import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getLevelTeam } from "../../../api/user.api";
import ReusableDataTable from "../../../components/ui/ReusableDataTable";
import { motion, AnimatePresence } from "framer-motion";
import { dateFormatter, formatCurrency, statusButton } from "../../../utils/additionalFn";

const UserLevelTeam = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["levelTeam"],
    queryFn: getLevelTeam,
  });

  const [openLevel, setOpenLevel] = useState(null);

  const handleToggle = (level) => {
    setOpenLevel((prev) => (prev === level ? null : level));
  };

  const columns = [
    { label: "#", key: "sr" },
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Referral Code", key: "referralCode" },
    { label: "Investment", key: "totalInvestment", render: (value) => formatCurrency(value?.toFixed(2) || "0.00") },
    { label: "Earnings", key: "totalEarnings", render: (value) => formatCurrency(value?.toFixed(2) || "0.00") },
    { label: "Team Business", key: "totalBusiness", render: (value) => formatCurrency(value?.toFixed(2) || "0.00") },
    { label: "Status", key: "isVerified", render: (value) => statusButton(value) },
    { label: "Joined At", key: "createdAt" , render : (value) => dateFormatter(value) },
  ];

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {data?.data?.map((levelItem) => (
        <div
          key={levelItem.level}
          className="border border-[var(--btnColor)]/30 rounded-xl overflow-hidden shadow-sm"
        >
          {/* 🔹 Header */}
          <div
            onClick={() => handleToggle(levelItem.level)}
            className="flex justify-between items-center p-4 cursor-pointer bg-white/5 hover:bg-white/10 transition"
          >
            <div className="flex gap-6 font-medium">
              <span className="text-lg text-[var(--btnColor)]">
                Level {levelItem.level}
              </span>
              <span className="text-gray-400">
                Users: {levelItem.count}
              </span>
            </div>

            {/* 🔹 Rotate Icon */}
            <motion.span
              animate={{ rotate: openLevel === levelItem.level ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg"
            >
              ▼
            </motion.span>
          </div>

          {/* 🔹 Animated Content */}
          <AnimatePresence initial={false}>
            {openLevel === levelItem.level && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white/5">
                  {levelItem.users.length > 0 ? (
                    <ReusableDataTable
                      data={levelItem.users.map((user, index) => ({
                        ...user,
                        sr: index + 1,
                      }))}
                      columns={columns}
                    />
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      No users found in this level
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default UserLevelTeam;