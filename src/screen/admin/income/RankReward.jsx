import { useState, useEffect } from 'react';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency, maskEmail } from '../../../utils/additionalFn';
import toast from 'react-hot-toast';
import { getAllReward } from '../../../api/admin.api';

const LegDetailsModal = ({ isOpen, onClose, record }) => {
    if (!isOpen || !record) return null;

    const maxVol = Math.max(...record.legDetails.map(l => l.volume));
    const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;
    const initials = (name) => name.trim().split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-5">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-[15px] font-medium text-gray-900 dark:text-white">
                            Leg details — {record.userId?.name}
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {record.userId?.username} · L{record.rewardLevel} {record.rewardLevelName}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Leg Cards */}
                <div className="space-y-3">
                    {record.legDetails.map((leg) => {
                        const volPct = Math.round((leg.volume / maxVol) * 100);
                        const tgtPct = Math.min(100, Math.round((leg.target / leg.volume) * 100));
                        const achieved = leg.volume >= leg.target;

                        return (
                            <div key={leg._id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">

                                {/* Leg User Info */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                                        {initials(leg.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{leg.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{leg.legUser?.email}</p>
                                    </div>
                                    {achieved && (
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                            Target met
                                        </span>
                                    )}
                                </div>

                                {/* Volume Bar */}
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs text-gray-400 w-14 flex-shrink-0">Volume</span>
                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${volPct}%` }} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-16 text-right">{fmt(leg.volume)}</span>
                                </div>

                                {/* Target Bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400 w-14 flex-shrink-0">Target</span>
                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${tgtPct}%` }} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-16 text-right">{fmt(leg.target)}</span>
                                </div>

                                {/* Footer Stats */}
                                <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-center">
                                        <p className="text-[11px] text-gray-400">Volume</p>
                                        <p className="text-sm font-medium text-blue-600">{fmt(leg.volume)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[11px] text-gray-400">Target</p>
                                        <p className="text-sm font-medium text-emerald-600">{fmt(leg.target)}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[11px] text-gray-400">Achievement</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                                            {Math.round((leg.volume / leg.target) * 100)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Combined Volume Footer */}
                <div className="mt-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-500">Combined leg volume</span>
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                        {fmt(record.legDetails.reduce((s, l) => s + l.volume, 0))}
                    </span>
                </div>
            </div>
        </div>
    );
};

const RankReward = () => {
    const [data, setData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchReward = async () => {
        try {
            const res = await getAllReward();
            setData(res?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch reward data");
        }
    };

    useEffect(() => {
        fetchReward();
    }, []);

    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (_, __, rowIndex) => rowIndex + 1
        },
        {
            label: 'User',
            key: 'userId',
            render: (value) => (
                <div>
                    <div className="font-medium">{value?.name}</div>
                    <div className="text-xs text-gray-400">{maskEmail(value?.email)}</div>
                </div>
            )
        },
        {
            label: 'Referral Code',
            key: 'userId',
            render: (value) => value?.username
        },
        {
            label: 'Level',
            key: 'rewardLevelName',
            render: (value, row) => (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    L{row.rewardLevel} — {value}
                </span>
            )
        },
        {
            label: 'Reward Amount',
            key: 'rewardAmount',
            render: (value) => formatCurrency(value)
        },
        {
            label: 'Self Investment',
            key: 'selfInvestment',
            render: (value) => formatCurrency(value)
        },
      
        {
            label: 'Leg Details',
            key: 'legDetails',
            render: (_, row) => (
                <button
                    onClick={() => { setSelectedRecord(row); setModalOpen(true); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    View legs
                </button>
            )
        },
        {
            label: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${value === 'credited' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
            )
        },
        {
            label: 'Date',
            key: 'createdAt',
            render: (value) => dateFormatter(value)
        },
    ];

    return (
        <div>
            <ReusableDataTable
                columns={columns}
                data={data}
                title="Rank Reward History"
            />
            <LegDetailsModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setSelectedRecord(null); }}
                record={selectedRecord}
            />
        </div>
    );
};

export default RankReward;