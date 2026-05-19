import React, { useEffect, useState } from 'react'
import { getAllLevelIncome } from '../../../api/admin.api';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn';
import toast from 'react-hot-toast';

const AdminLevelIncome = () => {
    const [data, setData] = useState([]);

    const fetchLevelIncome = async () => {
        try {
            const res = await getAllLevelIncome();
            setData(res?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch level income");
        }
    };

    useEffect(() => {
        fetchLevelIncome();
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
            key: 'fromUserId',
            render: (value) => value?.username || '-'
        },
        {
            label: 'Level',
            key: 'level',
            render: (value) => (
                <span className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-600 text-white">
                    Level {value}
                </span>
            )
        },
       
        {
            label: 'Investment Amount',
            key: 'investmentAmount',
            render: (value) => formatCurrency(value)
        },
         {
            label: 'Percent',
            key: 'percent',
            render: (value) => `${value}%`
        },
      
       
        {
            label: 'Income Amount',
            key: 'amount',
            render: (value) => (
                <span className="text-emerald-400 font-semibold">
                    {formatCurrency(value)}
                </span>
            )
        },
        {
            label: 'Credited At',
            key: 'creditedAt',
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

export default AdminLevelIncome;