import axios from "axios";
import React, { useEffect, useState } from "react";

const SportOdds = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    "https://api.the-odds-api.com/v4/sports/cricket_ipl/odds/?apiKey=10fac4365e68252b9bba4c194dd4e10e&regions=uk,us,eu&markets=h2h&oddsFormat=american",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log(res.data);

                setMatches(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-5">
            <h1 className="text-3xl font-bold mb-6 text-green-400">
                IPL Odds
            </h1>

            <div className="grid gap-5 md:grid-cols-2">
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className="bg-white/10 border border-green-500/20 rounded-3xl p-5 backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {match.home_team}
                            </h2>

                            <span className="text-green-400 font-bold">VS</span>

                            <h2 className="text-xl font-semibold">
                                {match.away_team}
                            </h2>
                        </div>

                        <p className="text-sm text-gray-400 mb-4">
                            {new Date(match.commence_time).toLocaleString()}
                        </p>

                        <div className="space-y-3">
                            {match.bookmakers?.slice(0, 3).map((bookmaker) => (
                                <div
                                    key={bookmaker.key}
                                    className="bg-black/40 rounded-2xl p-3"
                                >
                                    <h3 className="text-green-300 font-semibold mb-2">
                                        {bookmaker.title}
                                    </h3>

                                    {bookmaker.markets?.map((market) => (
                                        <div key={market.key}>
                                            {market.outcomes?.map((team, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between text-sm py-1"
                                                >
                                                    <span>{team.name}</span>

                                                    <span className="text-yellow-400 font-bold">
                                                        {team.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SportOdds;