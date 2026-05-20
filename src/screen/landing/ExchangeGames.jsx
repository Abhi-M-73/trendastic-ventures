import React from 'react'
import SectionLabel from '../../components/ui/SectionLabel'

import game1 from '../../assets/exchangeGames/exchangeGame(1).webp';
import game2 from '../../assets/exchangeGames/exchangeGame(2).webp';
import game3 from '../../assets/exchangeGames/exchangeGame(3).webp';
import game4 from '../../assets/exchangeGames/exchangeGame(4).webp';
import game5 from '../../assets/exchangeGames/exchangeGame(5).webp';
import game6 from '../../assets/exchangeGames/exchangeGame(6).webp';
import game7 from '../../assets/exchangeGames/exchangeGame(7).webp';
import game8 from '../../assets/exchangeGames/exchangeGame(8).webp';
import game9 from '../../assets/exchangeGames/exchangeGame(9).webp';
import game10 from '../../assets/exchangeGames/exchangeGame(10).webp';
import game11 from '../../assets/exchangeGames/exchangeGame(11).webp';
import game12 from '../../assets/exchangeGames/exchangeGame(12).webp';
import game13 from '../../assets/exchangeGames/exchangeGame(13).webp';
import game14 from '../../assets/exchangeGames/exchangeGame(14).webp';
import game15 from '../../assets/exchangeGames/exchangeGame(15).webp';
import game16 from '../../assets/exchangeGames/exchangeGame(16).webp';
import game17 from '../../assets/exchangeGames/exchangeGame(17).webp';
import game18 from '../../assets/exchangeGames/exchangeGame(18).webp';
import game19 from '../../assets/exchangeGames/exchangeGame(19).webp';
import game20 from '../../assets/exchangeGames/exchangeGame(20).webp';
import game21 from '../../assets/exchangeGames/exchangeGame(21).webp';
import game22 from '../../assets/exchangeGames/exchangeGame(22).webp';
import game23 from '../../assets/exchangeGames/exchangeGame(23).webp';
import game24 from '../../assets/exchangeGames/exchangeGame(24).webp';
import game25 from '../../assets/exchangeGames/exchangeGame(25).webp';
import game26 from '../../assets/exchangeGames/exchangeGame(26).webp';
import game27 from '../../assets/exchangeGames/exchangeGame(27).webp';
import game28 from '../../assets/exchangeGames/exchangeGame(28).webp';
import game29 from '../../assets/exchangeGames/exchangeGame(29).webp';
import game30 from '../../assets/exchangeGames/exchangeGame(30).webp';
import game31 from '../../assets/exchangeGames/exchangeGame(31).webp';
import game32 from '../../assets/exchangeGames/exchangeGame(32).webp';
import game33 from '../../assets/exchangeGames/exchangeGame(33).webp';
import game34 from '../../assets/exchangeGames/exchangeGame(34).webp';
import game35 from '../../assets/exchangeGames/exchangeGame(35).webp';

const ExchangeGames = () => {

    const exchangeGames = [
        game1, game2, game3, game4, game5,
        game6, game7, game8, game9, game10,
        game11, game12, game13, game14, game15,
        game16, game17, game18, game19, game20,
        game21, game22, game23, game24, game25,
        game26, game27, game28, game29, game30,
        game31, game32, game33, game34, game35
    ]

    return (
        <section className="relative py-5 bg-[#020707] overflow-hidden">

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

            {/* GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[92%] mx-auto relative z-10">
                <div className="w-full flex items-center mb-4">
                    <SectionLabel>
                        🎮 Exchange Games
                    </SectionLabel>
                </div>

                {/* TWO LINE GRID */}
                <div
                    className="
                        grid
                        grid-rows-2
                        grid-flow-col
                        gap-4
                        overflow-x-auto
                        scrollbar-hide
                        pb-2
                    "
                >

                    {exchangeGames.map((img, index) => (

                        <div
                            key={index}
                            className="
                                group
                                relative
                                w-[180px]
                                h-[240px]
                                rounded-[24px]
                                overflow-hidden
                                border border-teal-400/10
                                bg-black/30
                                backdrop-blur-xl
                                hover:border-teal-400/30
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:shadow-[0_0_40px_rgba(0,255,213,0.15)]
                                flex-shrink-0
                            "
                        >

                            {/* IMAGE */}
                            <img
                                src={img}
                                alt={`exchange-game-${index}`}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    group-hover:scale-110
                                    transition-all
                                    duration-700
                                "
                            />

                            {/* OVERLAY */}
                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-black/60
                                    via-transparent
                                    to-transparent
                                    opacity-0
                                    group-hover:opacity-100
                                    transition-all
                                    duration-500
                                "
                            />

                        </div>
                    ))}

                </div>

                <style>
                    {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }

                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    `}
                </style>

            </div>
        </section>
    )
}

export default ExchangeGames