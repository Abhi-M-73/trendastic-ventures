import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    getAllUserTicketList,
    approveTicket,
    rejectTicket,
} from '../../api/admin.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';

const AdminRaiseTicketList = () => {
    const queryClient = useQueryClient();

    const [openPopup, setOpenPopup] = useState(false);
    const [actionType, setActionType] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [message, setMessage] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['raiseTicketHistory'],
        queryFn: getAllUserTicketList,
    });

    // ================= APPROVE =================
    const approveMutation = useMutation({
        mutationFn: approveTicket,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['raiseTicketHistory'],
            });

            closePopup();
        },
    });

    // ================= REJECT =================
    const rejectMutation = useMutation({
        mutationFn: rejectTicket,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['raiseTicketHistory'],
            });

            closePopup();
        },
    });

    // ================= CLOSE POPUP =================
    const closePopup = () => {
        setOpenPopup(false);
        setSelectedTicket(null);
        setMessage('');
        setActionType('');
    };

    // ================= HANDLE ACTION =================
    const handleAction = () => {
        if (!message.trim()) {
            return alert('Please enter message');
        }

        const payload = {
            id: selectedTicket?._id,
            userId: selectedTicket?.userId?._id,
            name: selectedTicket?.userId?.name,
            message,
        };

        if (actionType === 'approve') {
            approveMutation.mutate(payload);
        } else {
            rejectMutation.mutate(payload);
        }
    };

    // ================= DATE FORMAT =================
    const dateFormatter = (date) => {
        return new Date(date).toLocaleString();
    };

    // ================= TABLE COLUMNS =================
    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (value, row, rowIndex) => rowIndex + 1,
        },

        {
            label: 'Username',
            key: 'userId',
            render: (value) => value?.username || 'N/A',
        },

        {
            label: 'Name',
            key: 'userId',
            render: (value) => value?.name || 'N/A',
        },

        {
            label: 'Subject',
            key: 'subject',
        },

        {
            label: 'Message',
            key: 'message',
        },

        {
            label: 'Proof',
            key: 'proofImage',
            render: (value) =>
                value?.url ? (
                    <a
                        href={value?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C9A84C] underline"
                    >
                        View
                    </a>
                ) : (
                    'N/A'
                ),
        },

        {
            label: 'Status',
            key: 'status',
            render: (value) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${value === 'Approved'
                            ? 'bg-green-500/20 text-green-500'
                            : value === 'Rejected'
                                ? 'bg-red-500/20 text-red-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                        }`}
                >
                    {value}
                </span>
            ),
        },

        {
            label: 'Date',
            key: 'createdAt',
            render: (value) => dateFormatter(value),
        },

        {
            label: 'Action',
            key: 'action',

            render: (value, row) => {
                return row?.status === 'Pending' ? (
                    <div className="flex items-center gap-2">
                        {/* APPROVE */}
                        <button
                            onClick={() => {
                                setActionType('approve');
                                setSelectedTicket(row);
                                setOpenPopup(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm transition-all duration-300"
                        >
                            Approve
                        </button>

                        {/* REJECT */}
                        <button
                            onClick={() => {
                                setActionType('reject');
                                setSelectedTicket(row);
                                setOpenPopup(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm transition-all duration-300"
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    <span className="text-gray-400 text-sm">
                        No action available
                    </span>
                );
            },
        },
    ];

    return (
        <div>
            <ReusableDataTable
                title="Raise Ticket History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />

            {/* ================= POPUP ================= */}
            {openPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl">
                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {actionType === 'approve'
                                        ? 'Approve Ticket'
                                        : 'Reject Ticket'}
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    Send response to user
                                </p>
                            </div>

                            <button
                                onClick={closePopup}
                                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                            >
                                ✕
                            </button>
                        </div>

                        {/* FORM */}
                        <div className="space-y-4">
                            {/* USER NAME */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">
                                    User Name
                                </label>

                                <input
                                    type="text"
                                    value={selectedTicket?.userId?.name || ''}
                                    readOnly
                                    className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white outline-none"
                                />
                            </div>

                            {/* TICKET ID */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">
                                    Ticket ID
                                </label>

                                <input
                                    type="text"
                                    value={selectedTicket?._id || ''}
                                    readOnly
                                    className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white outline-none"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">
                                    Message
                                </label>

                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message..."
                                    className="w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-white placeholder:text-gray-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex items-center justify-end gap-3 mt-8">
                            <button
                                onClick={closePopup}
                                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleAction}
                                disabled={
                                    approveMutation.isPending ||
                                    rejectMutation.isPending
                                }
                                className={`px-6 py-3 rounded-xl text-white transition-all duration-300 ${actionType === 'approve'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {approveMutation.isPending ||
                                    rejectMutation.isPending
                                    ? 'Loading...'
                                    : actionType === 'approve'
                                        ? 'Approve Ticket'
                                        : 'Reject Ticket'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRaiseTicketList;