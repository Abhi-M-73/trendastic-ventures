import React from 'react'
import { getLevelIncome } from '../../../api/user.api';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { useQuery } from '@tanstack/react-query';
import { dateFormatter, formatCurrency, formatPercentage, levelButton, maskEmail } from '../../../utils/additionalFn';

const UserLevelIncome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['levelTeam'],
    queryFn: getLevelIncome,
  });

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'From User', key: "fromUserId" , render: (value) => value?.username || 'N/A' },
    { label: 'From User Email', key: 'fromUserId', render: (value) => maskEmail(value?.email) },
    { label: 'Referral Income', key: 'amount', render: (value) => formatCurrency(value) },
    { label: 'Percentage(%)', key: 'percent', render: (value) => formatPercentage(value) },
    { label: 'Level', key: 'level', render: (value) => levelButton(value) },
    { label: 'Date', key: 'creditedAt', render: (value) => dateFormatter(value) },
  ]

  return (
    <div>
      <ReusableDataTable
        title="Level Income"
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  )
}

export default UserLevelIncome
