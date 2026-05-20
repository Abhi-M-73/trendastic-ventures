import React, { useState } from "react";

const UserDepositWithdrawHistory = () => {
    const [activeTab, setActiveTab] = useState("deposit");

    // DUMMY DATA
    const depositHistory = [
        {
            id: "#DEP1021",
            amount: "₹5,000",
            method: "UPI",
            status: "Success",
            date: "20 May 2026",
        },
        {
            id: "#DEP1022",
            amount: "₹2,500",
            method: "Bank Transfer",
            status: "Pending",
            date: "18 May 2026",
        },
        {
            id: "#DEP1023",
            amount: "₹8,000",
            method: "Crypto",
            status: "Rejected",
            date: "16 May 2026",
        },
    ];

    const withdrawHistory = [
        {
            id: "#WTH4501",
            amount: "₹3,000",
            method: "Bank Account",
            status: "Success",
            date: "19 May 2026",
        },
        {
            id: "#WTH4502",
            amount: "₹1,200",
            method: "UPI",
            status: "Pending",
            date: "17 May 2026",
        },
        {
            id: "#WTH4503",
            amount: "₹6,000",
            method: "Crypto Wallet",
            status: "Rejected",
            date: "15 May 2026",
        },
    ];

    const currentData =
        activeTab === "deposit" ? depositHistory : withdrawHistory;

    return (
        <div className="w-full p-5">
            <div className="w-full mx-auto bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden">

                {/* HEADER */}
                <div className="p-5 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">
                        Transaction History
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        View all your deposit and withdraw records
                    </p>
                </div>

                {/* TABS */}
                <div className="p-4 flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab("deposit")}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "deposit"
                                ? "bg-green-500 text-black"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                    >
                        Deposit History
                    </button>

                    <button
                        onClick={() => setActiveTab("withdraw")}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === "withdraw"
                                ? "bg-green-500 text-black"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                    >
                        Withdraw History
                    </button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 text-left">
                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Transaction ID
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Method
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                                >
                                    <td className="px-5 py-4 text-white font-medium">
                                        {item.id}
                                    </td>

                                    <td className="px-5 py-4 text-green-400 font-semibold">
                                        {item.amount}
                                    </td>

                                    <td className="px-5 py-4 text-gray-300">
                                        {item.method}
                                    </td>

                                    <td className="px-5 py-4 text-gray-400">
                                        {item.date}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Success"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : item.status === "Pending"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* EMPTY STATE */}
                {currentData.length === 0 && (
                    <div className="p-10 text-center text-gray-400">
                        No history found
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDepositWithdrawHistory;