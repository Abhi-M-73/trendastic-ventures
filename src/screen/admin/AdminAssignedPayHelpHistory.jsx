import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAssignedPayHelpUserList } from '../../api/admin.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency, statusButton, statusButton2 } from '../../utils/additionalFn';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AdminAssignedPayHelpHistory = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['assignedPayHelpHistory'],
        queryFn: getAssignedPayHelpUserList,
        staleTime: 5 * 60 * 1000,
    });


    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Sender Username', key: "userId", render: (value) => value?.username || "N/A" },
        { label: 'Sender Name', key: "userId", render: (value) => value?.name || "N/A" },
        { label: 'Receiver Username', key: "receiverId", render: (value) => value?.username || "N/A" },
        { label: 'Receiver Name', key: "receiverId", render: (value) => value?.name || "N/A" },
        { label: 'Amount', key: "amount", render: (value) => formatCurrency(value) || "N/A" },
        { label: 'Status', key: 'status', render: (value) => statusButton2(value) },
        { label: 'Assign Date', key: 'createdAt', render: (value) => dateFormatter(value) || "N/A" },
        { label: 'Expire Date', key: 'expiresAt', render: (value) => dateFormatter(value) || "N/A" },
    ];

    return (
        <div>
            <ReusableDataTable
                title="Assigned Pay Help History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    );
};

export default AdminAssignedPayHelpHistory;
