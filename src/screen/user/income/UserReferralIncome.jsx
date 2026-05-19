import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getReferralIncome } from '../../../api/user.api';
import Loader from '../../../components/ui/Loader';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency, formatPercentage, levelButton, maskEmail } from '../../../utils/additionalFn';

const UserReferralIncome = () => {
  const { data } = useQuery({
    queryKey: ['getReferralIncome'],
    queryFn: getReferralIncome,
  });

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'From User', key: "fromUser" , render: (value) => value?.username || 'N/A' },
    { label: 'From User Email', key: 'fromUser', render: (value) => maskEmail(value?.email) },
    { label: 'Referral Income', key: 'amount', render: (value) => formatCurrency(value) },
    { label: 'Percentage(%)', key: 'percent', render: (value) => formatPercentage(value) },
    { label: 'Deposit Amount', key: 'baseAmount', render: (value) => formatCurrency(value) },
    { label: 'Date', key: 'date', render: (value) => dateFormatter(value) },
  ]

  return (
    <div>
      <ReusableDataTable
        data={data?.data || []}
        columns={columns}
      />
    </div>
  )
}

export default UserReferralIncome
