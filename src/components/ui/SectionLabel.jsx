function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-2 px-4 pt-5 pb-3">
            <span className="text-emerald-400 text-[10px] font-bold tracking-[2.5px] uppercase whitespace-nowrap">
                {children}
            </span>
            <div className="flex-1 h-px bg-emerald-500/20" />
        </div>
    );
}

export default SectionLabel;