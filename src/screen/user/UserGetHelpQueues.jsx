import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
    approveGetHelp,
    getUserGetHelpQueues,
    rejectGetHelp
} from '../../api/user.api';

import ReusableDataTable from '../../components/ui/ReusableDataTable';

import {
    dateFormatter,
    formatCurrency,
    statusButton2
} from '../../utils/additionalFn';

import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const UserGetHelpQueues = () => {
    const queryClient = useQueryClient();
    const [approveLoadingId, setApproveLoadingId] = useState(null);
    const [rejectLoadingId, setRejectLoadingId] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ['getHelpQueueHistory'],
        queryFn: getUserGetHelpQueues,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
    });

    // APPROVE
    const handleApprove = async (rowData) => {

        const { isConfirmed } = await Swal.fire({
            title: 'Approve Payment?',
            text: 'Are you sure you want to approve this payment?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Approve',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            background: '#0f172a',
            color: '#fff',
        });

        if (!isConfirmed) return;

        try {

            setApproveLoadingId(rowData?._id);

            const promise = approveGetHelp(rowData?._id);

            toast.promise(promise, {
                loading: 'Approving payment...',
                success: (res) => {

                    queryClient.invalidateQueries({
                        queryKey: ['getHelpQueueHistory'],
                    });

                    setApproveLoadingId(null);

                    return (
                        res?.message ||
                        'Payment approved successfully'
                    );
                },

                error: (error) => {

                    setApproveLoadingId(null);

                    return (
                        error?.response?.data?.message ||
                        'Something went wrong'
                    );
                },
            });

        } catch (error) {

            setApproveLoadingId(null);

            toast.error(
                error?.response?.data?.message ||
                'Something went wrong'
            );
        }
    };

    // REJECT
    const handleReject = async (rowData) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Reject Payment?',
            text: 'Are you sure you want to reject this payment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#475569',
            background: '#0f172a',
            color: '#fff',
        });

        if (!isConfirmed) return;

        try {
            setRejectLoadingId(rowData?._id);
            const promise = rejectGetHelp(rowData?._id);
            toast.promise(promise, {
                loading: 'Rejecting payment...',
                success: (res) => {
                    queryClient.invalidateQueries({
                        queryKey: ['getHelpQueueHistory'],
                    });
                    setRejectLoadingId(null);
                    return (
                        res?.message ||
                        'Payment rejected successfully'
                    );
                },

                error: (error) => {
                    setRejectLoadingId(null);
                    return (
                        error?.response?.data?.message ||
                        'Something went wrong'
                    );
                },
            });

        } catch (error) {
            setRejectLoadingId(null);
            toast.error(
                error?.response?.data?.message ||
                'Something went wrong'
            );
        }
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
            render: (value) =>
                formatCurrency(value) || 'N/A',
        },
        {
            label: 'UTR No',
            key: 'utr',
            render: (value) =>
                value || 'N/A',
        },
        {
            label: 'Proof',
            key: 'proof',
            render: (value) => (
                <a
                    href={value?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={value?.url}
                        alt="proof"
                        className="h-16 w-24 rounded-lg object-cover border border-slate-700"
                    />
                </a>
            ),
        },
        {
            label: 'Status',
            key: 'status',
            render: (value) => statusButton2(value),
        },
        {
            label: 'Assign Date',
            key: 'createdAt',
            render: (value) =>
                dateFormatter(value) || 'N/A',
        },
        {
            label: 'Expire Date',
            key: 'expiresAt',
            render: (value) =>
                dateFormatter(value) || 'N/A',
        },
        {
            label: 'Action',
            key: 'status',

            render: (value, row) => (
                value === 'processing' ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleApprove(row)}
                            disabled={
                                approveLoadingId === row?._id ||
                                rejectLoadingId === row?._id
                            }
                            className="min-w-[90px] bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        >
                            {
                                approveLoadingId === row?._id
                                    ? 'Approving...'
                                    : 'Approve'
                            }
                        </button>

                        <button
                            onClick={() => handleReject(row)}
                            disabled={
                                rejectLoadingId === row?._id ||
                                approveLoadingId === row?._id
                            }
                            className="min-w-[90px] bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        >
                            {
                                rejectLoadingId === row?._id
                                    ? 'Rejecting...'
                                    : 'Reject'
                            }
                        </button>
                    </div>
                ) : (
                    <p className='text-xs text-slate-400'>
                        No Action Available
                    </p>
                )
            ),
        },
    ];

    return (
        <div>
            <ReusableDataTable
                title="Get Help Queues"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    );
};

export default UserGetHelpQueues;