import React, { useState } from 'react'
import OtpInputWithButton from '../../components/ui/OtpInputWithButton';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import ReusableForm from '../../components/ui/ReusableForm';
import ReusableButton from '../../components/ui/ReusableButton';
import { useMutation } from '@tanstack/react-query';
import { resetPassword, sendOtpForResetPassword } from '../../api/user.api';
import toast from 'react-hot-toast';

const ForgetPassword = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload) => sendOtpForResetPassword(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "OTP sent successfully!");
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Login failed. Please try again."
            );
        }
    });

    const handleSendOtp = () => {
        if (!formData.email) {
            toast.error("Please enter your email.");
            return;
        }
        mutate({ email: formData.email });
    }


    const { mutate: handleResetPassword, isPending: isResetPasswordPending } = useMutation({
        mutationFn: (payload) => resetPassword(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Password reset successful!");
            onNavigate("/login");
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Login failed. Please try again."
            );
        }
    });

    const handleSubmit = () => {
        if (!formData.email || !formData.otp || !formData.newPassword) {
            toast.error("Please fill in all required fields.");
            return;
        }
        handleResetPassword({ email: formData.email, otp: formData.otp, password: formData.newPassword });
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-white text-4xl text-center font-semibold mb-5'>Forget Password</h1>

            <OtpInputWithButton
                label="Email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
                icon={Mail}
                buttonLabel="Send"
                loading={isPending}
                onButtonClick={handleSendOtp}
                disabled={isPending}
            />

            <ReusableForm
                label="OTP"
                name="otp"
                type="number"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter your email"
                required={true}
                icon={Mail}
            />

            <ReusableForm
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Enter your new password"
                required={true}
                icon={Lock}
            />

            <div className="w-full mt-4">
                <ReusableButton
                    label="Reset Password"
                    onClick={handleSubmit}
                    loading={isResetPasswordPending}
                    disabled={isResetPasswordPending}
                    icon={Lock}
                    variant="primary"
                    type="button"
                />
            </div>
        </div>
    )
}

export default ForgetPassword
