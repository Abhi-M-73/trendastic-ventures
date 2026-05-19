import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { User, Search, Wallet, TrendingUp, IndianRupee, Pin } from 'lucide-react';
import { getUserByUsername, pinTopupUser, topupUser } from '../../../api/admin.api';
import ReusableForm from '../../../components/ui/ReusableForm';
import ReusableButton from '../../../components/ui/ReusableButton';
import toast from 'react-hot-toast';

const AdminPinTopup = () => {
    const [username, setUsername] = useState("");
    const [count, setCount] = useState("");
    const [pinType, setPinType] = useState("");
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const handleFindUser = async () => {
        if (!username.trim()) return toast.error("Please enter a username");
        setIsFetching(true);
        try {
            const res = await getUserByUsername({ userName: username });
            if (res?.data) {
                setUser(res.data);
            } else {
                setUser(null);
                toast.error("User not found");
            }
        } catch (error) {
            setUser(null);
            toast.error(error?.response?.data?.message || "User not found");
        } finally {
            setIsFetching(false);
        }
    };

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: pinTopupUser,
        onSuccess: (res) => {
            toast.success(res?.message || 'Pin topup successfully');
            queryClient.invalidateQueries({ queryKey: ['pinTopupHistory'] });
            setPinType("");
            setCount("");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        },
    });

    const handleTopupUser = () => {
        if (!pinType) {
            return toast.error("Please select a pin type");
        }
        if (!count) {
            return toast.error("Please enter a count");
        }
        mutate({ username: user?.username, pinType, count: Number(count) });
    };

    return (
        <div className='max-w-3xl w-full mx-auto space-y-4'>
            <div className='flex gap-2 items-center flex-col sm:flex-row'>
                <div className='flex-1'>
                    <ReusableForm
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Type Username Here"
                        required
                        icon={User}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setUser(null);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleFindUser()}
                    />
                </div>
                <ReusableButton
                    label={isFetching ? "Searching..." : "Find User"}
                    onClick={handleFindUser}
                    icon={Search}
                    loading={isFetching}
                    disabled={isFetching || !username.trim()}
                    className='w-full sm:w-auto mt-6'
                />
            </div>

            {/* User Card */}
            {user && (
                <div className='w-full space-y-4 border border-slate-600 rounded-lg p-5'>

                    {/* Profile Row */}
                    <div className='p-4 border border-slate-600 rounded-lg flex items-center gap-4'>
                        <div className='h-16 w-16 rounded-full border-2 border-slate-500 flex items-center justify-center text-2xl font-bold bg-slate-700 shrink-0'>
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className='space-y-1'>
                            <p className='text-lg font-semibold'>{user.username}</p>
                            <p className='text-sm text-slate-400'>{user.email}</p>
                            <p className='text-xs text-slate-500'>Referral: {user.referralCode}</p>
                        </div>
                    </div>

                    {/* Stats Row */}
                    {/* <div className='grid grid-cols-2 gap-3'>
                        <div className='border border-slate-600 rounded-lg p-4 flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0'>
                                <IndianRupee className='h-5 w-5 text-blue-400' />
                            </div>
                            <div>
                                <p className='text-xs text-slate-400'>Total Investment</p>
                                <p className='text-base font-semibold text-blue-400'>
                                    ₹{user.totalInvestment?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className='border border-slate-600 rounded-lg p-4 flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-full bg-emerald-600/20 flex items-center justify-center shrink-0'>
                                <TrendingUp className='h-5 w-5 text-emerald-400' />
                            </div>
                            <div>
                                <p className='text-xs text-slate-400'>Total Earnings</p>
                                <p className='text-base font-semibold text-emerald-400'>
                                    ₹{user.totalEarnings?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <ReusableForm
                        label="Select Pin Type"
                        name="pinType"
                        type="select"
                        placeholder="Enter Pin Type"
                        required
                        icon={Pin}
                        value={pinType}
                        onChange={(e) => setPinType(e.target.value)}
                        options={["Silver Pin", "Gold Pin", "Diamond Pin"]}
                    />

                    <ReusableForm
                        label="Pin Count"
                        name="count"
                        type="number"
                        placeholder="Enter Pin Count"
                        required
                        icon={Pin}
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    />

                    <ReusableButton
                        label="Pin Topup"
                        onClick={handleTopupUser}
                        icon={Wallet}
                        loading={isPending}
                        disabled={isPending}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminPinTopup;