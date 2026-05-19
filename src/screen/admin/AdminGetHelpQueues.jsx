import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHelpQueueHistory, getPayHelpQueueHistory } from '../../api/admin.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency } from '../../utils/additionalFn';

const AdminGetHelpQueues = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getHelpQueueHistory'],
        queryFn: getHelpQueueHistory,
    });

    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Username', key: "username", render: (value) => value || "N/A" },
        { label: 'Name', key: "name", render: (value) => value || "N/A" },
        {
            label: 'Eligible GH',
            key: 'getHelpEligibleAmount',
            render: (value, row) => {
                return row?.isSilverPinActive
                    ? formatCurrency(5000)
                    : row?.isGoldPinActive
                        ? formatCurrency(10000)
                        : row?.isDiamondPinActive
                            ? formatCurrency(20000)
                            : 0;
            }
        },
        { label: 'Silver GH', key: 'silverGetHelpAmount', render: (value) => formatCurrency(value) },
        { label: 'Gold GH', key: 'goldGetHelpAmount', render: (value) => formatCurrency(value) },
        { label: 'Diamond GH', key: 'diamondGetHelpAmount', render: (value) => formatCurrency(value) },

        { label: 'Completed GH', key: 'getHelpTotalAmount', render: (value) => formatCurrency(value) },
        { label: 'GH Eligible Date', key: 'isGetHelpEligibleDate', render: (value) => dateFormatter(value) },
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

export default AdminGetHelpQueues;
