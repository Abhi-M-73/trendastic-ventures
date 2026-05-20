import React from 'react';
import SectionLabel from '../../components/ui/SectionLabel';

import img1 from '../../assets/cardGames/cardGame1 (1).avif';
import img2 from '../../assets/cardGames/cardGame1 (2).avif';
import img3 from '../../assets/cardGames/cardGame1 (3).avif';
import img4 from '../../assets/cardGames/cardGame1 (4).avif';
import img5 from '../../assets/cardGames/cardGame1 (5).avif';
import img6 from '../../assets/cardGames/cardGame1 (6).avif';
import img7 from '../../assets/cardGames/cardGame1 (7).avif';
import img8 from '../../assets/cardGames/cardGame1 (8).avif';
import img9 from '../../assets/cardGames/cardGame1 (9).avif';
import img10 from '../../assets/cardGames/cardGame1 (10).avif';
import img11 from '../../assets/cardGames/cardGame1 (11).avif';
import img12 from '../../assets/cardGames/cardGame1 (12).avif';
import img13 from '../../assets/cardGames/cardGame1 (13).avif';
import img14 from '../../assets/cardGames/cardGame1 (14).avif';
import img15 from '../../assets/cardGames/cardGame1 (15).avif';
import img16 from '../../assets/cardGames/cardGame1 (16).avif';
import img17 from '../../assets/cardGames/cardGame1 (17).avif';
import img18 from '../../assets/cardGames/cardGame1 (18).avif';
import img19 from '../../assets/cardGames/cardGame1 (19).avif';
import img20 from '../../assets/cardGames/cardGame1 (20).avif';

const CardGames = () => {

    const cardGames = [
        img1, img2, img3, img4, img5,
        img6, img7, img8, img9, img10,
        img11, img12, img13, img14, img15,
        img16, img17, img18, img19, img20
    ];

    return (
        <section className="relative py-5 bg-[#020707] overflow-hidden">

            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

            {/* GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[92%] mx-auto relative z-10">

                {/* SECTION LABEL */}
                <div className="flex items-center mb-3">
                    <SectionLabel>
                        🎮 AI Card Gaming Arena
                    </SectionLabel>
                </div>

                {/* SINGLE LINE IMAGES */}
                <div
                    className="
        flex
        items-center
        gap-4
        flex-nowrap
        overflow-x-auto
        scrollbar-hide
        pb-2
    "
                >

                    {cardGames.map((img, index) => (

                        <div
                            key={index}
                            className="
                                group
                                relative
                                min-w-[180px]
                                h-[260px]
                                overflow-hidden
                                rounded-[24px]
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
                                alt={`card-game-${index}`}
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
                            <div className="
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/60
                                via-transparent
                                to-transparent
                                opacity-0
                                group-hover:opacity-100
                                transition-all
                                duration-500
                            " />

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
    );
};

export default CardGames;