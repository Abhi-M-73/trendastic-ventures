import React, { useEffect, useState } from 'react'
import { getWithdrawalHistory } from '../../../api/user.api';
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';

const UserWithdrawHistory = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithdrawalHistory = async () => {
    try {
      setIsLoading(true);
      const response = await getWithdrawalHistory();
      if (response?.success) {
        setWithdrawalHistory(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'Withdraw Amount', key: "amount", render: (value) => formatCurrency(value) },
    { label: 'UPI ID', key: "upiId" },
    { label: 'UPI Name', key: "upiName" },
    {
      label: 'Status', key: 'status', render: (value) => {
        const statusStyles = {
          approved: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          rejected: 'bg-red-100 text-red-800',
        };
        return (<span className={`px-2 inline-flex text-xs leading-5 font-semibold capitalize rounded-full ${statusStyles[value] || 'bg-gray-100 text-gray-800'}`}>
          {value}
        </span>
        );
      }
    },
    { label: 'Request Date', key: 'createdAt', render: (value) => dateFormatter(value) },
    { label: 'Approval Date', key: 'approvedDate', render: (value) => dateFormatter(value) },
  ]

  return (
    <div>
      <ReusableDataTable
        title="Withdrawal History"
        data={withdrawalHistory || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  )
}

export default UserWithdrawHistory
