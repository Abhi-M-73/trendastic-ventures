import { useQuery } from '@tanstack/react-query'
import ReusableDataTable from '../../../components/ui/ReusableDataTable'
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { activateUserPinByAdminHistory } from '../../../api/admin.api'

const AdminActivatedPinHistory = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, isLoading } = useQuery({
        queryKey: ['pinActivationHistory'],
        queryFn: activateUserPinByAdminHistory,
        staleTime: 5 * 60 * 1000,
    });

    const navigate = useNavigate();

    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Username', key: "userId", render: (value) => value?.username || 'N/A' },
        { label: 'Name', key: "userId", render: (value) => value?.name || 'N/A' },
        { label: 'Pin Type', key: "pinType"},
        { label: 'Activation Date', key: 'createdAt', render: (value) => dateFormatter(value) },
    ]

    return (
        <div>
            <ReusableDataTable
                title="Pin Activation History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />
        </div>
    )
}

export default AdminActivatedPinHistory
