import React from "react";

const UserAccountStatement = () => {
    const statementData = [
        {
            id: "#TRX1021",
            type: "Bet Win",
            amount: "+ ₹4,500",
            status: "Credit",
            date: "20 May 2026",
        },
        {
            id: "#TRX1022",
            type: "Bet Loss",
            amount: "- ₹2,000",
            status: "Debit",
            date: "19 May 2026",
        },
        {
            id: "#TRX1023",
            type: "Deposit",
            amount: "+ ₹8,000",
            status: "Credit",
            date: "18 May 2026",
        },
        {
            id: "#TRX1024",
            type: "Withdraw",
            amount: "- ₹3,500",
            status: "Debit",
            date: "17 May 2026",
        },
    ];

    return (
        <div className="w-full p-5">
            <div className="w-full mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Account Statement
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            View your profit, loss & transaction history
                        </p>
                    </div>

                    {/* SUMMARY CARDS */}
                    <div className="flex flex-wrap gap-3">
                        <div className="px-5 py-3 rounded-2xl bg-green-500/10 border border-green-500/20">
                            <p className="text-xs text-gray-300">Total Profit</p>
                            <h3 className="text-lg font-bold text-green-400">
                                ₹12,500
                            </h3>
                        </div>

                        <div className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20">
                            <p className="text-xs text-gray-300">Total Loss</p>
                            <h3 className="text-lg font-bold text-red-400">
                                ₹5,200
                            </h3>
                        </div>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="p-5 flex flex-col md:flex-row gap-3">
                    <input
                        type="date"
                        className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none w-full md:w-[220px]"
                    />

                    <input
                        type="date"
                        className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none w-full md:w-[220px]"
                    />

                    <button className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-semibold">
                        Apply Filter
                    </button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px]">
                        <thead>
                            <tr className="bg-white/5 text-left">
                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Transaction ID
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Type
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-300">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {statementData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                                >
                                    <td className="px-5 py-4 text-white font-medium">
                                        {item.id}
                                    </td>

                                    <td className="px-5 py-4 text-gray-300">
                                        {item.type}
                                    </td>

                                    <td className="px-5 py-4 text-gray-400">
                                        {item.date}
                                    </td>

                                    <td
                                        className={`px-5 py-4 font-bold ${item.status === "Credit"
                                                ? "text-green-400"
                                                : "text-red-400"
                                            }`}
                                    >
                                        {item.amount}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Credit"
                                                    ? "bg-green-500/20 text-green-400"
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
                {statementData.length === 0 && (
                    <div className="p-10 text-center text-gray-400">
                        No statement found
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAccountStatement;