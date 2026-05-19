import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency, legButton, maskEmail } from '../../../utils/additionalFn';
import { getPinTopupHistory, getTopupHistory } from '../../../api/admin.api';

const AdminPinTopupHistory = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['pinTopupHistory'],
        queryFn: getPinTopupHistory,
        staleTime: 5 * 60 * 1000,
    });

    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Username', key: "userId", render: (value) => value?.username || "N/A" },
        { label: 'Email', key: "userId", render: (value) => value?.email || "N/A" },
        { label: 'Pin Count', key: 'count' },
        { label: 'Pin Type', key: 'pinType'},
        { label: 'Date', key: 'createdAt', render: (value) => dateFormatter(value) },
    ];

    return (
        <div>
            <ReusableDataTable
                title="Pin Topup History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    );
};

export default AdminPinTopupHistory;
