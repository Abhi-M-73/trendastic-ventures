import React, { useEffect, useState } from 'react'
import ReusableButton from '../../components/ui/ReusableButton';
import { Link2, Lock, Mail, Phone, PhoneCall, User } from 'lucide-react';
import ReusableForm from '../../components/ui/ReusableForm';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { userRegister } from '../../api/user.api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { AuthenticatedRoutes } from '../../routes/Routes';

const Register = ({ onNavigate }) => {
  const params = useSearchParams();
  const referralCode = new URLSearchParams(params[0]).get("ref");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: referralCode || ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const { mutate, isPending } = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
      dispatch(setUser(data?.user?.data));
      dispatch(setToken(data?.token));
      navigate(AuthenticatedRoutes.USER_DASHBOARD);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  });

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      referredBy: formData.referralCode
    };
    mutate(payload);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (referralCode) {
      setFormData({ ...formData, referralCode: referralCode });
    }
  }, [referralCode]);

  return (
    <div className='space-y-4'>
      <h1 className='text-white text-4xl text-center font-semibold mb-5'>Register Now</h1>
      <ReusableForm
        type={"text"}
        label={"Name"}
        name={"name"}
        value={formData.name}
        onChange={handleInputChange}
        placeholder={"Enter Your Name"}
        required={true}
        icon={User}
      />
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
        type={"number"}
        label={"Phone"}
        name={"phone"}
        value={formData.phone}
        onChange={handleInputChange}
        placeholder={"Enter Your Phone Number"}
        required={true}
        icon={PhoneCall}
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
      <ReusableForm
        type={"password"}
        label={"Confirm Password"}
        name={"confirmPassword"}
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder={"Enter Your Confirm Password"}
        required={true}
        icon={Lock}
      />
      <ReusableForm
        type={"text"}
        label={"Referral Code"}
        name={"referralCode"}
        value={formData.referralCode}
        onChange={handleInputChange}
        placeholder={"Enter Referral Code"}
        required={true}
        icon={Link2}
      />

      {/* <OtpInputWithButton
        label="Email OTP"
        name="otp"
        value={""}
        onChange={(e) => {}}
        placeholder="Enter OTP"
        required
        icon={Mail}
        buttonLabel="Send"
        loading={false}
        onButtonClick={() => {
          console.log("Send OTP");
        }}
      />; */}

      <div className="w-full mt-4">
        <ReusableButton
          label={isPending ? "Processing..." : "Register"}
          onClick={handleRegister}
          loading={isPending}
          disabled={isPending}
          icon={Lock}
          variant="primary"
          type="button"
        />
      </div>

      <div>
        <p className="text-md text-center text-gray-400 whitespace-nowrap">
          Already have an account? {""}
          <span onClick={() => onNavigate("/login")} className="text-[var(--btnColor)] font-medium cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register
