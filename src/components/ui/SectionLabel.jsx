function SectionLabel({ children }) {
    return (
        <div className="w-full flex items-center gap-4 py-4">

            {/* TEXT */}
            <div
                    className="
                        relative
                        py-2
                        overflow-hidden
                        rounded-sm
                    "
            >
                <span
                    className="
                        relative
                        text-emerald-300
                        text-[11px]
                        font-extrabold
                        tracking-[3px]
                        uppercase
                        whitespace-nowrap
                    "
                >
                    {children}
                </span>
            </div>

            {/* LINE */}
            <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-400/40 via-emerald-400/30 to-transparent" />
        </div>
    );
}

export default SectionLabel;