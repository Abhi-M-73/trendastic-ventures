import React, { useState } from 'react'
import ReusableForm from '../../components/ui/ReusableForm';
import { Lock, Mail } from 'lucide-react';
import ReusableButton from '../../components/ui/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { useMutation } from '@tanstack/react-query';
import { AuthenticatedRoutes } from '../../routes/Routes';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import { adminLogin } from '../../api/admin.api';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { mutate, isPending } = useMutation({
        mutationFn: adminLogin,
        onSuccess: (data) => {
            toast.success(data?.message || "Admin Login successful!");
            dispatch(setUser(data?.data));
            dispatch(setToken(data?.token));
            navigate(AuthenticatedRoutes.ADMIN_DASHBOARD);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Login failed. Please try again."
            );
        }
    });

    const handleAdminLogin = () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }
        mutate(formData);
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-white text-4xl text-center font-semibold mb-5'>Admin Login</h1>
            <ReusableForm
                type={"email"}
                label={"Email"}
                name={"email"}
                value={formData.email}
                onChange={handleInputChange}
                placeholder={"Enter Your Email"}
                required={true}
                icon={Mail}
            />
            <ReusableForm
                type={"password"}
                label={"Password"}
                name={"password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder={"Enter Your Password"}
                required={true}
                icon={Lock}
            />

            <div className="w-full mt-4">
                <ReusableButton
                    label={isPending ? "Processing..." : "Login"}
                    onClick={handleAdminLogin}
                    loading={isPending}
                    icon={Lock}
                    variant="primary"
                    type="button"
                />
            </div>
        </div>
    )
}

export default AdminLogin
