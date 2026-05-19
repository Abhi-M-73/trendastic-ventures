import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAssignedGetHelpUserList } from '../../api/admin.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency, statusButton, statusButton2 } from '../../utils/additionalFn';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AdminAssignedGetHelpHistory = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['assignedGetHelpHistory'],
        queryFn: getAssignedGetHelpUserList,
        staleTime: 5 * 60 * 1000,
    });


    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Username', key: "userId", render: (value) => value?.username || "N/A" },
        { label: 'Name', key: "userId", render: (value) => value?.name || "N/A" },
        {
            label: 'Pin Type',
            key: "pinType",
            render: (value) =>
                value
                    ? `${value.charAt(0).toUpperCase() + value.slice(1)} Pin`
                    : "N/A"
        },
        { label: 'Assign Date', key: 'createdAt', render: (value) => dateFormatter(value) || "N/A" },
    ];

    return (
        <div>
            <ReusableDataTable
                title="Assigned Get Help History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    );
};

export default AdminAssignedGetHelpHistory;
