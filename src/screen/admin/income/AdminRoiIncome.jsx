import React, { useEffect, useState } from 'react'
import { getAllRoi } from '../../../api/admin.api';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn';
import toast from 'react-hot-toast';

const AdminRoiIncome = () => {
    const [data, setData] = useState([]);

    const fetchRoiIncome = async () => {
        try {
            const res = await getAllRoi();
            setData(res?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch ROI income");
        }
    };

    useEffect(() => {
        fetchRoiIncome();
    }, []);

    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (value, row, rowIndex) => rowIndex + 1
        },
        {
            label: 'Username',
            key: 'userId',
            render: (value) => value?.username || '-'
        },
        {
            label: 'Investment Amount',
            key: 'investmentAmount',
            render: (value) => formatCurrency(value)
        },
          {
            label: 'Percentage',
            key: 'percentage',
            render: (value) => `${value}%`
        },
        {
            label: 'ROI Amount',
            key: 'roiAmount',
            render: (value) => (
                <span className="text-emerald-400 font-semibold">
                    {formatCurrency(value)}
                </span>
            )
        },
      
        {
            label: 'Total ROI Earned',
            key: 'investmentId',
            render: (value) => formatCurrency(value?.totalRoiEarned)
        },
       
        {
            label: 'Credited On',
            key: 'creditedOn',
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

export default AdminRoiIncome;