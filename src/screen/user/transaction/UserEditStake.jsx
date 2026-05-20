import React, { useState } from "react";

const UserEditStake = () => {
    const [selectedStake, setSelectedStake] = useState(500);

    const stakeValues = [
        100,
        200,
        300,
        500,
        1000,
        2000,
        5000,
        75000,
        100000,
        125000,
    ];

    return (
        <div className="w-full flex items-center justify-center p-5">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-green/40 backdrop-blur-xl p-8 shadow-2xl">

                {/* TITLE */}
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-white">
                        Edit Stake
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                        Please fill all required fields (*)
                    </p>
                </div>

                {/* STAKE GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {stakeValues.map((stake, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedStake(stake)}
                            className={`h-14 rounded-2xl border transition-all duration-300 text-sm md:text-base font-semibold ${selectedStake === stake
                                    ? "bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/20 scale-[1.03]"
                                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                }`}
                        >
                            ₹ {stake}
                        </button>
                    ))}
                </div>

                {/* SELECTED VALUE */}
                <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                        Selected Stake
                    </span>

                    <h3 className="text-2xl font-bold text-green-400">
                        ₹ {selectedStake}
                    </h3>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="h-14 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white font-semibold text-lg">
                        Cancel
                    </button>

                    <button className="h-14 rounded-2xl bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-bold text-lg shadow-lg shadow-green-500/20">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserEditStake;