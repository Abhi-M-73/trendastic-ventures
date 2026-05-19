import React, { useState } from 'react'
import ReusableForm from '../../components/ui/ReusableForm';
import { Lock, Mail, User } from 'lucide-react';
import ReusableButton from '../../components/ui/ReusableButton';
import OtpInputWithButton from '../../components/ui/OtpInputWithButton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogin } from '../../api/user.api';
import { AuthenticatedRoutes, AuthRoutes } from '../../routes/Routes';
import toast from 'react-hot-toast';

const Login = ({ onNavigate }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful!");
      dispatch(setUser(data?.data));
      dispatch(setToken(data?.token));
      navigate(AuthenticatedRoutes.USER_DASHBOARD);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  });

  const handleLogin = () => {
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    mutate(formData);
  };

  return (
    <div className='space-y-4'>
      <h1 className='text-white text-4xl text-center font-semibold mb-5'>Welcome Back</h1>
      <ReusableForm
        type={"text"}
        label={"Username"}
        name={"username"}
        value={formData.username}
        onChange={handleInputChange}
        placeholder={"Enter Your Username"}
        required={true}
        icon={User}
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

      <p
        onClick={() => onNavigate(AuthRoutes.FORGET_PASSWORD)}
        className='text-right text-white text-sm hover:text-[var(--btnColor)] hover:underline'
      >
        <p>Forgot Password ?</p>
      </p>

      <div className="w-full mt-4">
        <ReusableButton
          label={isPending ? "Processing..." : "Login"}
          onClick={handleLogin}
          loading={isPending}
          disabled={isPending}
          icon={Lock}
          variant="primary"
          type="button"
        />
      </div>

      <div>
        <p className="text-md whitespace-nowrap text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <span onClick={() => onNavigate("/register")} className="text-[var(--btnColor)] font-medium cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
