import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAll5PHUsers } from '../../api/admin.api'
import { dateFormatter, formatCurrency } from '../../utils/additionalFn';
import ReusableDataTable from '../../components/ui/ReusableDataTable';

const Admin5PhCompletionReward = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin5PhCompletionReward'],
        queryFn: () => getAll5PHUsers(),
    });

    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Name', key: "userId", render: (value) => value?.name || "N/A" },
        { label: 'Username', key: "userId", render: (value) => value?.username || "N/A" },
        { label: 'Total PH Users', key: 'directPaidCount'},
        { label: 'Pin Type', key: 'planType', render: (value) => value?.toUpperCase() || "N/A" },
        { label: 'Eligible Date', key: 'qualifiedAt', render: (value) => dateFormatter(value) },
      ]

    return (
        <div>
            <ReusableDataTable
                title="5PH Completion Users"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    )
}

export default Admin5PhCompletionReward
