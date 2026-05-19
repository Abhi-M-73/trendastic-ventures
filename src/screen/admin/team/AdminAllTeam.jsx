import { useState, useEffect } from 'react';
import ReusableDataTable from '../../../components/ui/ReusableDataTable';
import {
    dateFormatter,
    formatCurrency,
    maskEmail
} from '../../../utils/additionalFn';

import {
    getAllTeam,
    changeUserPasswordApi 
} from '../../../api/admin.api';

import toast from 'react-hot-toast';

const AdminAllTeam = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // popup states
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const fetchTeam = async () => {
        try {
            setLoading(true);
            const res = await getAllTeam();
            setData(res?.data || []);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to fetch team data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    // open modal
    const handleOpenPasswordModal = (row) => {
        setSelectedUser(row);
        setPassword(row?.rawPassword || '');
        setOpenModal(true);
    };

    // change password
    const handleChangePassword = async () => {
        try {
            if (!password) {
                return toast.error("Password is required");
            }
            setBtnLoading(true);
            const res = await changeUserPasswordApi({
                userId: selectedUser?._id,
                password
            });
            if (res?.success) {
                toast.success("Password changed successfully");
                setOpenModal(false);
                setPassword('');
                setSelectedUser(null);
                fetchTeam();
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to change password"
            );
        } finally {
            setBtnLoading(false);
        }
    };

    const columns = [
        {
            label: '#',
            key: 'sr',
            render: (value, row, rowIndex) => rowIndex + 1
        },
        {
            label: 'Name',
            key: 'name'
        },
        {
            label: 'Username',
            key: 'username'
        },
        {
            label: 'Email',
            key: 'email',
            render: (value) => maskEmail(value)
        },
        {
            label: 'Password',
            key: 'rawPassword',
            render: (value, row) => (
                <button
                    onClick={() => handleOpenPasswordModal(row)}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1 rounded-lg text-sm font-medium transition-all"
                >
                    {value}
                </button>
            )
        },
        {
            label: 'Referral Code',
            key: 'referralCode'
        },
        {
            label: 'Silver Pin',
            key: 'silverPinCount'
        },
        {
            label: 'Gold Pin',
            key: 'goldPinCount'
        },
        {
            label: 'Diamond Pin',
            key: 'diamondPinCount'
        },
        {
            label: 'Pin Type',
            key: 'pinType',
            render: (value, row) => {
                if (row?.isDiamondPinActive) {
                    return (
                        <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                            Diamond Pin
                        </span>
                    );
                }

                if (row?.isGoldPinActive) {
                    return (
                        <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                            Gold Pin
                        </span>
                    );
                }

                if (row?.isSilverPinActive) {
                    return (
                        <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">
                            Silver Pin
                        </span>
                    );
                }

                return (
                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                        No Active Pin
                    </span>
                );
            },
        },
        {
            label: 'Total PH Amount',
            key: 'payHelpTotalAmount',
            render: (value) => formatCurrency(value)
        },
        {
            label: 'Total GH Amount',
            key: 'getHelpTotalAmount',
            render: (value) => formatCurrency(value)
        },
        {
            label: 'Verified',
            key: 'isVerified',
            render: (value) => (
                <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium text-white
                    ${value ? 'bg-emerald-600' : 'bg-red-500'}`}
                >
                    {value ? 'Verified' : 'Unverified'}
                </span>
            )
        },
        {
            label: 'Joined At',
            key: 'createdAt',
            render: (value) => dateFormatter(value)
        },
    ];

    return (
        <div>
            <ReusableDataTable
                title="All Team"
                data={data}
                columns={columns}
                loading={loading}
            />

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-black w-full max-w-md rounded-2xl p-6 border border-[var(--btnColor)]/40">

                        <h2 className="text-2xl text-center font-semibold text-[var(--btnColor)] mb-5">
                            Change Password
                        </h2>

                        <div className="space-y-3">
                            <label className="text-sm text-gray-300">
                                Password
                            </label>

                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-slate-950/30 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-5 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleChangePassword}
                                disabled={btnLoading}
                                className="px-5 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition-all disabled:opacity-50"
                            >
                                {btnLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllTeam;