import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserPayHelpQueues, payToAssignedUser } from '../../api/user.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';
import {
    dateFormatter,
    formatCurrency,
    statusButton2
} from '../../utils/additionalFn';
import toast from 'react-hot-toast';

const UserPayHelpQueues = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [paymentData, setPaymentData] = useState({
        utrNo: '',
        screenshot: null,
    });

    const { data, isLoading } = useQuery({
        queryKey: ['payHelpQueueHistory'],
        queryFn: getUserPayHelpQueues,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: payToAssignedUser,
        onSuccess: (data) => {
            toast.success(data?.message || 'Payment submitted successfully');
            setIsAddModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['payHelpQueueHistory'] });
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || 'Something went wrong'
            );
        },
    });

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setPaymentData({
            utrNo: '',
            screenshot: null,
        });
        setIsAddModalOpen(true);
    };

    const handlePaymentInput = (e) => {
        const { name, value, files, type } = e.target;
        setPaymentData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmitPayment = () => {
        if (!paymentData.screenshot) {
            return toast.error('Screenshot is required');
        }
        const payload = new FormData();
        payload.append('utr', paymentData.utrNo);
        payload.append('file', paymentData.screenshot);
        payload.append('receiverId', selectedUser?.receiverId?._id);
        mutate(payload);
    };

    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (value, row, rowIndex) => rowIndex + 1,
        },
        {
            label: 'Sender Username',
            key: 'userId',
            render: (value) => value?.username || 'N/A',
        },
        {
            label: 'Receiver Username',
            key: 'receiverId',
            render: (value) => value?.username || 'N/A',
        },
        {
            label: 'Amount',
            key: 'amount',
            render: (value) => formatCurrency(value) || 'N/A',
        },
        {
            label: 'UTR No',
            key: 'utr',
            render: (value) =>
                value || 'N/A',
        },
       
        {
            label: 'Status',
            key: 'status',
            render: (value) => statusButton2(value),
        },
        {
            label: 'Assign Date',
            key: 'createdAt',
            render: (value) => dateFormatter(value) || 'N/A',
        },
        {
            label: 'Expire Date',
            key: 'expiresAt',
            render: (value) => dateFormatter(value) || 'N/A',
        },
        {
            label: 'Action',
            key: 'status',
            render: (value, row) => (
                value === "pending" ? (
                    <button
                        onClick={() => handleOpenModal(row)}
                        className="bg-teal-600 text-white px-3 py-1 rounded-full capitalize text-xs"
                    >
                        Pay
                    </button>
                ) : (
                    <p className='text-xs text-slate-400'>
                        No Action Available
                    </p>
                )
            ),
        },
        {
            label: 'Proof',
            key: 'proof',
            render: (value) => {
                return value?.url ? (
                    <a
                        href={value.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={value.url}
                            alt="proof"
                            className="h-16 w-24 rounded-lg object-cover border border-slate-700"
                        />
                    </a>
                ) : (
                    <span className="text-xs text-slate-400">
                        Not Uploaded Yet
                    </span>
                );
            },
        },
    ];

    return (
        <div className=''>
            <ReusableDataTable
                title="Pay Help Queues"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 p-3 sm:p-4 overflow-y-auto">
                    <div className="min-h-full flex items-center justify-center py-6">
                        <div className="w-full max-w-6xl rounded-3xl border border-slate-700 bg-[#04050a] p-4 sm:p-6 shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* LEFT SIDE */}
                                <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950 p-5 md:p-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                                Receiver Payment Details
                                            </h2>

                                            <p className="text-sm text-slate-400 mt-1">
                                                Send payment using any available method
                                            </p>
                                        </div>


                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        {/* Bank Name */}
                                        {selectedUser?.receiverId?.bankName && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    Bank Name
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.bankName}
                                                </p>
                                            </div>
                                        )}

                                        {/* Account Number */}
                                        {selectedUser?.receiverId?.accountNumber && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    Account Number
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.accountNumber}
                                                </p>
                                            </div>
                                        )}

                                        {/* IFSC */}
                                        {selectedUser?.receiverId?.IFSCCode && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    IFSC Code
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.IFSCCode}
                                                </p>
                                            </div>
                                        )}

                                        {/* UPI */}
                                        {selectedUser?.receiverId?.upiId && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    UPI ID
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.upiId}
                                                </p>
                                            </div>
                                        )}

                                        {/* Google Pay */}
                                        {selectedUser?.receiverId?.googlePayNumber && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    Google Pay Number
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.googlePayNumber}
                                                </p>
                                            </div>
                                        )}

                                        {/* PhonePe */}
                                        {selectedUser?.receiverId?.phonePayNumber && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    PhonePe Number
                                                </p>

                                                <p className="text-white font-semibold break-all">
                                                    {selectedUser?.receiverId?.phonePayNumber}
                                                </p>
                                            </div>
                                        )}

                                        {/* Wallet */}
                                        {selectedUser?.receiverId?.walletAddress && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:col-span-2">
                                                <p className="text-xs text-slate-400 mb-1">
                                                    Wallet Address (USDT BEP20)
                                                </p>

                                                <p className="text-white font-semibold break-all text-sm">
                                                    {selectedUser?.receiverId?.walletAddress}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6 flex flex-col justify-between">

                                    <div>

                                        <h2 className="text-xl md:text-2xl font-semibold text-[var(--btnColor)] mb-5">
                                            Submit Payment
                                        </h2>

                                        {/* QUICK INFO */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">

                                            {/* Receiver Name */}
                                            {selectedUser?.receiverId?.name && (
                                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                                    <p className="text-xs text-slate-400 mb-1">
                                                        Receiver Name
                                                    </p>

                                                    <p className="text-white font-semibold break-all">
                                                        {selectedUser?.receiverId?.name}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                                                <p className="text-xs text-slate-400">
                                                    Receiver
                                                </p>

                                                <p className="text-white font-semibold mt-1 truncate">
                                                    {selectedUser?.receiverId?.username}
                                                </p>
                                            </div>

                                            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl w-fit">
                                                <p className="text-xs text-slate-400">
                                                    Amount
                                                </p>
                                                <p className="text-emerald-400 text-xl font-bold">
                                                    ₹ {selectedUser?.amount}
                                                </p>
                                            </div>


                                        </div>

                                        <div className="space-y-4">

                                            <input
                                                type="text"
                                                name="utrNo"
                                                value={paymentData.utrNo}
                                                onChange={handlePaymentInput}
                                                placeholder="Enter UTR Number"
                                                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-500"
                                            />

                                            <input
                                                type="file"
                                                name="screenshot"
                                                accept="image/*"
                                                onChange={handlePaymentInput}
                                                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-500"
                                            />

                                        </div>

                                    </div>

                                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">

                                        <button
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="rounded-2xl border border-slate-600 px-5 py-3 text-sm text-white hover:bg-slate-800 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleSubmitPayment}
                                            disabled={isPending}
                                            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50 transition"
                                        >
                                            {isPending
                                                ? 'Submitting...'
                                                : 'Submit Payment'}
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPayHelpQueues;