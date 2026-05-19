import { useQuery } from '@tanstack/react-query'
import ReusableDataTable from '../../../components/ui/ReusableDataTable'
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getTransferPinHistory } from '../../../api/user.api'
import { useSelector } from 'react-redux'

const UserPinTransferHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useQuery({
    queryKey: ['pinTransferHistory'],
    queryFn: getTransferPinHistory,
    staleTime: 5 * 60 * 1000,
  });



  const navigate = useNavigate();

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'Sender Name', key: "senderId", render: (value) => value?.name || 'N/A' },
    { label: 'Sender Username', key: "senderId", render: (value) => value?.username || 'N/A' },
    { label: 'Receiver Name', key: "receiverId", render: (value) => value?.name || 'N/A' },
    { label: 'Receiver Username', key: "receiverId", render: (value) => value?.username || 'N/A' },
    {
      label: 'Pin Type', key: "pinType", render: (value) => value === "silverPinCount" ? "Silver Pin" : value === "goldPinCount" ? "Gold Pin" : value === "diamondPinCount" ? "Diamond Pin" : "N/A"
    },
    { label: 'Pin Count', key: "pinCount" },
    { label: 'Transfer Type', key: "receiverId", render: (value) => value.username === user?.username ? "Transfer in" : "Transfer out" },
    { label: 'Date', key: 'createdAt', render: (value) => dateFormatter(value) },
  ]

  return (
    <div>
      <ReusableDataTable
        title="Pin Transfer History"
        data={data?.pinTransferHistory || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  )
}

export default UserPinTransferHistory
