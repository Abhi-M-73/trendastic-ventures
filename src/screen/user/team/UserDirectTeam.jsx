import { useQuery } from '@tanstack/react-query'
import ReusableDataTable from '../../../components/ui/ReusableDataTable'
import { getDirectTeam } from '../../../api/user.api'
import { dateFormatter, formatCurrency, legButton, maskEmail, statusButton } from '../../../utils/additionalFn'

const UserDirectTeam = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['directTeam'],
    queryFn: getDirectTeam,
    // staleTime: 5 * 60 * 1000,
  });

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'Username', key: "username" },
    { label: 'Email', key: 'email', render: (value) => maskEmail(value) },
    { label: 'Referral Code', key: 'referralCode' },
    { label: 'Status', key: 'isVerified', render: (value) => statusButton(value) },
    { label: 'Joined At', key: 'createdAt', render: (value) => dateFormatter(value) },
  ]

  return (
    <div>
      <ReusableDataTable
        title="Direct Team"
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  )
}

export default UserDirectTeam
