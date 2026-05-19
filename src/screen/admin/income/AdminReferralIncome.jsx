import React, { useEffect, useState } from 'react'
import { getAllReferalIncome } from '../../../api/admin.api';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn';
import toast from 'react-hot-toast';

const AdminReferralIncome = () => {
    const [data, setData] = useState([]);

    const fetchReferralIncome = async () => {
        try {
            const res = await getAllReferalIncome();
            setData(res?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch referral income");
        }
    };

    useEffect(() => {
        fetchReferralIncome();
    }, []);

    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (value, row, rowIndex) => rowIndex + 1
        },
        {
            label: 'To User',
            key: 'userId',
            render: (value) => value?.username || '-'
        },
        {
            label: 'From User',
            key: 'fromUser',
            render: (value) => value?.username || '-'
        },
          {
            label: 'Investment Amount',
            key: 'investmentId',
            render: (value) => formatCurrency(value?.investmentAmount)
        },
      
        {
            label: 'Percent',
            key: 'percent',
            render: (value) => `${value}%`
        },
        {
            label: 'Bonus Amount',
            key: 'amount',
            render: (value) => formatCurrency(value)
        },
      
        {
            label: 'Investment Status',
            key: 'investmentId',
            render: (value) => (
                <span className={`px-3 py-1 rounded-lg text-xs font-medium text-white
                    ${value?.status === 'completed' ? 'bg-emerald-600' : 'bg-yellow-500'}`}>
                    {value?.status?.charAt(0).toUpperCase() + value?.status?.slice(1) || '-'}
                </span>
            )
        },
        {
            label: 'Created At',
            key: 'createdAt',
            render: (value) => dateFormatter(value)
        },
    ];

    return (
        <div>
            <ReusableDataTable
                data={data}
                columns={columns}
            />
        </div>
    );
};

export default AdminReferralIncome;