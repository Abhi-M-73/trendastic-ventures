import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignHelpToUser, assignUserToGH, getPayHelpQueueHistory } from '../../api/admin.api';
import ReusableDataTable from '../../components/ui/ReusableDataTable';
import { dateFormatter, formatCurrency } from '../../utils/additionalFn';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AdminPayHelpQueues = () => {
  const [assignData, setAssignData] = useState({
    username: '',
    amount: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ghConfirmUser, setGhConfirmUser] = useState(null); // new state for GH confirm modal

  const { data, isLoading } = useQuery({
    queryKey: ['payHelpQueueHistory'],
    queryFn: getPayHelpQueueHistory,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: assignHelpToUser,
    onSuccess: (data) => {
      toast.success(data?.message || 'User assigned successfully');
      setIsAddModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['payHelpQueueHistory'],
      })

      queryClient.invalidateQueries({
        queryKey: ['assignedPayHelpHistory'],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const { mutate: assignToGH, isPending: isPendingGH } = useMutation({
    mutationFn: assignUserToGH,
    onSuccess: (data) => {
      toast.success(data?.message || 'User assigned to GH successfully');
      setGhConfirmUser(null);
      queryClient.invalidateQueries({
        queryKey: ['payHelpQueueHistory'],
      });

      queryClient.invalidateQueries({
        queryKey: ['getHelpQueueHistory'],
      });

      queryClient.invalidateQueries({
        queryKey: ['assignedGetHelpHistory'],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      setGhConfirmUser(null);
    },
  });

  const handleOpenModal = (user) => {
    let amount = '';
    if (user?.isDiamondPinActive) amount = 10000;
    else if (user?.isGoldPinActive) amount = 5000;
    else if (user?.isSilverPinActive) amount = 2500;

    setAssignData({ username: '', amount });
    setSelectedUser(user);
    setIsAddModalOpen(true);
  };

  const handleAssignInput = (e) => {
    const { name, value } = e.target;
    setAssignData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignUser = () => {
    if (!assignData.username) return toast.error('Username is required');
    if (!assignData.amount) return toast.error('Amount is required');

    const payload = {
      receiverUsername: assignData.username,
      amount: Number(assignData.amount),
      senderUsername: selectedUser?.username,
    };
    mutate(payload);
  };

  const handleAssignToGHQueueList = () => {
    if (!ghConfirmUser) return toast.error('Username is required');
    assignToGH({ username: ghConfirmUser });
  };

  const columns = [
    { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
    { label: 'Username', key: 'username', render: (value) => value || 'N/A' },
    { label: 'Name', key: 'name', render: (value) => value || 'N/A' },
    {
      label: 'Pin Type',
      key: 'pinType',
      render: (value, row) => {
        if (row?.isDiamondPinActive)
          return <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">Diamond Pin</span>;
        if (row?.isGoldPinActive)
          return <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">Gold Pin</span>;
        if (row?.isSilverPinActive)
          return <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">Silver Pin</span>;
        return <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold">No Active Pin</span>;
      },
    },
    { label: 'Silver PH', key: 'totalSilverPayHelpAmount', render: (value) => formatCurrency(value) },
    { label: 'Gold PH', key: 'totalGoldPayHelpAmount', render: (value) => formatCurrency(value) },
    { label: 'Diamond PH', key: 'totalDiamondPayHelpAmount', render: (value) => formatCurrency(value) },
    {
      label: 'Assigned Status',
      key: 'isPayHelpAssigned',
      isBadge: true,
      render: (value) => (
        <span className="p-2 rounded-full">{value ? 'Assigned' : 'Not Assigned'}</span>
      ),
    },
    {
      label: 'Date',
      key: 'isPayHelpEligibleDate',
      render: (value) => dateFormatter(value) || 'N/A',
    },
    {
      label: 'Assign Link',
      key: 'isPayHelpEligible',
      render: (value, row) =>
        row?.isPayHelpAssigned ? (
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">Already Assigned</span>
        ) : (
          <button
            onClick={() => handleOpenModal(row)}
            className="bg-teal-600 text-white px-3 py-1 rounded-full capitalize text-xs"
          >
            Assign Link
          </button>
        ),
    },
    {
      label: 'Action',
      key: 'username',
      render: (value) => (
        <button
          onClick={() => setGhConfirmUser(value)} // opens confirm modal instead of direct call
          className="bg-blue-600 text-white px-3 py-1 rounded-full capitalize text-xs"
        >
          Assign to GH
        </button>
      ),
    },
  ];

  return (
    <div>
      <ReusableDataTable
        title="Pay Help Queues"
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />

      {/* Assign Link Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#04050a] p-6 shadow-2xl">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-white">Assign User</h2>
              <p className="text-sm text-slate-400 mt-1">Assign pay help request to another user.</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="username"
                value={assignData.username}
                onChange={handleAssignInput}
                placeholder="Enter Receiver Username"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-teal-500"
              />
              <input
                type="number"
                name="amount"
                value={assignData.amount}
                onChange={handleAssignInput}
                placeholder="Enter Amount"
                readOnly
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-teal-500"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignUser}
                disabled={isPending}
                className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-500"
              >
                {isPending ? 'Assigning...' : 'Assign Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign to GH Confirm Modal */}
      {ghConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-[#04050a] border border-slate-700 p-5">

            <h2 className="text-lg font-semibold text-white">
              Assign to GH Queue?
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Do you want to assign this user to the GH queue?
            </p>

            <div className="mt-4 rounded-lg bg-white/5 p-3">
              <p className="text-xs text-slate-500">Username</p>
              <p className="text-sm text-white font-medium">
                {ghConfirmUser}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setGhConfirmUser(null)}
                disabled={isPendingGH}
                className="px-4 py-2 rounded-lg border border-slate-600 text-white text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleAssignToGHQueueList}
                disabled={isPendingGH}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
              >
                {isPendingGH ? "Assigning..." : "Yes, Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayHelpQueues;