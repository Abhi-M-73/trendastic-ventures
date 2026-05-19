






import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllDeposits, approveDeposit, rejectDeposit, getAllWithdraw, approveWithdraw, rejectWithdraw } from '../../../api/admin.api';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';

const AdminWithdrawalRequests = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchDepositHistory = async () => {
    try {
      setLoading(true);
      const res = await getAllWithdraw();
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setDeposits(list);
    } catch (err) {
      console.error('Failed to fetch deposit history:', err);
      toast.error('Failed to fetch deposit history.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (rowData) => {
    console.log('Approve clicked for:', rowData);
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>
          Approve ₹{rowData.amount} ?
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                setActionLoading(rowData._id);
                await approveWithdraw(rowData._id);
                toast.success('Deposit approved successfully!');
                await fetchDepositHistory();
              } catch (err) {
                console.error('Approve failed:', err);
                toast.error('Failed to approve deposit.');
              } finally {
                setActionLoading(null);
              }
            }}
            style={{
              padding: '4px 14px', borderRadius: '8px', border: 'none',
              background: '#34d399', color: '#fff', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer',
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '4px 14px', borderRadius: '8px', border: 'none',
              background: '#475569', color: '#fff', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleReject = (rowData) => {
    let reason = '';

    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '240px' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>
          Reject ₹{rowData.amount} ?
        </span>
        <input
          type="text"
          placeholder="Enter reason..."
          onChange={(e) => { reason = e.target.value; }}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            border: '1px solid #475569',
            background: '#1e293b',
            color: '#fff',
            fontSize: '13px',
            outline: 'none',
            width: '100%',
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={async () => {
              if (!reason.trim()) {
                toast.error('Reason is required!');
                return;
              }
              toast.dismiss(t.id);
              try {
                setActionLoading(rowData._id);
                await rejectWithdraw(rowData._id, reason.trim());
                toast.success('Deposit rejected.');
                await fetchDepositHistory();
              } catch (err) {
                console.error('Reject failed:', err);
                toast.error('Failed to reject deposit.');
              } finally {
                setActionLoading(null);
              }
            }}
            style={{
              padding: '4px 14px', borderRadius: '8px', border: 'none',
              background: '#f87171', color: '#fff', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer',
            }}
          >
            Reject
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '4px 14px', borderRadius: '8px', border: 'none',
              background: '#475569', color: '#fff', fontWeight: 600,
              fontSize: '13px', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const columns = [
    {
      key: '_index',
      label: '#',
      isIndex: true,
      sortable: false,
    },
    
    {
  key: 'userId',
  label: 'Username',
  sortable: false,
  render: (value) => value?.username || '-',
},
{
  key: 'userId',
  label: 'Email',
  sortable: false,
  render: (value) => value?.email || '-',
},
   
    {
      key: 'upiId',
      label: 'UPI ID',
      isBadge: true,
      badgeColor: 'sky',
      sortable: true,
    },
    // {
    //   key: 'upiName',
    //   label: 'Name',
    //   isBadge: true,
    //   badgeColor: 'sky',
    //   sortable: true,
    // },
    {
      key: 'amount',
      label: 'Amount (₹)',
      sortable: true,
      render: (value) => `₹${Number(value).toLocaleString('en-IN')}`,
    },
    // {
    //   key: 'proofImage',
    //   label: 'Proof',
    //   sortable: false,
    //   render: (value) => {
    //     const url = value?.url;
    //     if (!url) return <span style={{ color: '#94a3b8', fontSize: '12px' }}>No Image</span>;
    //     return (
    //       <img
    //         src={url}
    //         alt="Proof"
    //         onError={(e) => { e.target.style.display = 'none'; }}
    //         style={{
    //           width: '40px',
    //           height: '40px',
    //           borderRadius: '8px',
    //           objectFit: 'cover',
    //           border: '1.5px solid rgba(255,255,255,0.15)',
    //           cursor: 'pointer',
    //           display: 'block',
    //         }}
    //         onClick={() => window.open(url, '_blank')}
    //       />
    //     );
    //   },
    // },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const colorMap = {
          pending:  { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)'  },
          approved: { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.3)'  },
          rejected: { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
        };
        const s = colorMap[value] || colorMap.pending;
        return (
          <span style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 600,
            background: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            textTransform: 'capitalize',
          }}>
            {value ?? '-'}
          </span>
        );
      },
    },
    {
      key: 'rejectionReason',
      label: 'Reject Reason ',
      sortable: false,
      render: (value) => value || '-',
    },
   
    {
      key: 'approvedDate',
      label: 'Approved At',
      sortable: true,
      render: (value) =>
        value
          ? new Date(value).toLocaleString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })
          : '-',
    },
   
   
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, rowData) => {
        const isThisLoading = actionLoading === rowData._id;
        const isPending = rowData.status === 'pending';

        if (!isPending) {
          return (
            <span style={{
              fontSize: '12px',
              color: rowData.status === 'approved' ? '#34d399' : '#f87171',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}>
              {rowData.status}
            </span>
          );
        }

        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              disabled={isThisLoading}
              onClick={() => handleApprove(rowData)}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1.5px solid #34d39966',
                background: isThisLoading ? 'rgba(52,211,153,0.05)' : 'rgba(52,211,153,0.12)',
                color: '#34d399',
                cursor: isThisLoading ? 'not-allowed' : 'pointer',
                opacity: isThisLoading ? 0.6 : 1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {isThisLoading ? '...' : 'Approve'}
            </button>
            <button
              disabled={isThisLoading}
              onClick={() => handleReject(rowData)}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1.5px solid #f8717166',
                background: isThisLoading ? 'rgba(248,113,113,0.05)' : 'rgba(248,113,113,0.12)',
                color: '#f87171',
                cursor: isThisLoading ? 'not-allowed' : 'pointer',
                opacity: isThisLoading ? 0.6 : 1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {isThisLoading ? '...' : 'Reject'}
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchDepositHistory();
  }, []);

  return (
    <div className="p-4">
      <ReusableDataTable
        title="Deposit History"
        data={deposits}
        columns={columns}
        dataKey="_id"
        loading={loading}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </div>
  );
};

export default AdminWithdrawalRequests;