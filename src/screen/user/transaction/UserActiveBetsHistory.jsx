import React from "react";

const UserActiveBetsHistory = () => {
    const bets = [];

    return (
        <div className="w-full p-5">
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl min-h-[500px]">

                {/* HEADER */}
                <div className="px-5 py-4 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">
                        Bet History
                    </h2>
                </div>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-3 bg-white/10 px-5 py-3 text-sm font-semibold text-gray-300 rounded-xl mx-4 mt-4">
                    <div>Event</div>
                    <div className="text-center">Odds</div>
                    <div className="text-right">Stake</div>
                </div>

                {/* EMPTY STATE */}
                {bets.length === 0 ? (
                    <div className="flex items-center justify-center h-[350px] px-4">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-5">
                                🎯
                            </div>

                            <h3 className="text-2xl font-semibold text-white mb-2">
                                No Bets Yet
                            </h3>

                            <p className="text-gray-400 text-sm md:text-base">
                                No bets placed yet, Place your bet now!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {bets.map((bet, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 items-center bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-2xl px-5 py-4 border border-white/10"
                            >
                                {/* EVENT */}
                                <div>
                                    <h4 className="text-white font-semibold">
                                        {bet.event}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {bet.date}
                                    </p>
                                </div>

                                {/* ODDS */}
                                <div className="text-center">
                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                                        {bet.odds}
                                    </span>
                                </div>

                                {/* STAKE */}
                                <div className="text-right">
                                    <h4 className="text-yellow-400 font-bold">
                                        ₹{bet.stake}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserActiveBetsHistory;