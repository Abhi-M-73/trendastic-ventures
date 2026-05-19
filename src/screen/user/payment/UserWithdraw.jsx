import React, { use, useState } from "react";
import ReusableForm from "../../../components/ui/ReusableForm";
import { ArrowBigUpDash, BadgeDollarSign, IndianRupee, Landmark, User } from "lucide-react";
import { useSelector } from "react-redux";
import ReusableButton from "../../../components/ui/ReusableButton";
import { useMutation } from "@tanstack/react-query";
import { withdrawalRequest } from "../../../api/user.api";
import toast from "react-hot-toast";
import useFetchProfile from "../../../hooks/usefetchProfile";

const UserWithdraw = () => {
  const { fetchProfile } = useFetchProfile();
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");

  const balance = user?.currentEarnings?.toFixed(2) || 0;
  const minWithdraw = 100;
  const feePercent = 0;

  const fee = amount ? (amount * feePercent) / 100 : 0;
  const netAmount = amount ? amount - fee : 0;

  const { mutate, isPending } = useMutation({
    mutationFn: (withdrawData) => withdrawalRequest(withdrawData),
    onSuccess: (data) => {
      toast.success(data?.message || "Withdrawal request successful!");
      fetchProfile();
      setAmount("");
      setUpiId("");
      setUpiName("");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Withdrawal request failed. Please try again."
      )
    }
  });

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (amount < minWithdraw) {
      toast.error(`Minimum withdraw amount is $${minWithdraw}`);
      return;
    }
    if (amount > balance) {
      toast.error("Insufficient balance.");
      return;
    }
    if (!upiId || upiId.trim() === "") {
      toast.error("Please enter your UPI ID.");
      return;
    }
    if (!upiName || upiName.trim() === "") {
      toast.error("Please enter your UPI Name.");
      return;
    }
    mutate({ amount: Number(amount), upiId, upiName });
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl bg-black/20 border border-[var(--btnColor)]/30 shadow-xl">
      <h2 className="text-2xl text-center font-semibold text-[var(--btnColor)] mb-6">
        Withdraw Funds
      </h2>

      {/* 🔹 Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="mb-4 flex justify-between text-sm bg-white/5 p-4 rounded-lg border border-[var(--btnColor)]/30">
          <span className="text-gray-300">Available Balance:</span>
          <span className="text-green-400 font-semibold">
            ₹{balance}
          </span>
        </div>

        {/* 🔹 Min Withdraw */}
        <div className="mb-4 flex justify-between text-sm bg-white/5 p-4 rounded-lg border border-[var(--btnColor)]/30">
          <span className="text-gray-300">Minimum Withdraw:</span>
          <span className="text-yellow-400 font-medium">
            ₹{minWithdraw}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <ReusableForm
          label="Enter Amount"
          name="amount"
          type="number"
          placeholder="Enter withdrawal amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          icon={IndianRupee}
        />
      </div>

      <div className="mb-6">
        <ReusableForm
          label="Enter UPI ID"
          name="upiId"
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          icon={Landmark}
        />
      </div>

      <div className="mb-6">
        <ReusableForm
          label="Enter UPI Name"
          name="upiName"
          type="text"
          placeholder="Enter your UPI Name"
          value={upiName}
          onChange={(e) => setUpiName(e.target.value)}
          icon={User}
        />
      </div>

      {/* 🔹 Fee */}
      {/* <div className="mb-3 flex justify-between text-sm font-medium">
        <span className="text-gray-300">Fee ({feePercent}%):</span>
        <span className="text-red-300">
          ${fee.toFixed(2)}
        </span>
      </div> */}

      {/* 🔹 You will get */}
      <div className="mb-6 flex justify-between text-sm font-medium">
        <span className="text-gray-400">You will get:</span>
        <span className="text-cyan-400 font-semibold">
          ₹{netAmount.toFixed(2)}
        </span>
      </div>


      <div className="w-full mt-4">
        <ReusableButton
          label="Withdraw Now"
          onClick={handleWithdraw}
          loading={isPending}
          disabled={isPending || amount > balance}
          icon={ArrowBigUpDash}
          variant="primary"
          type="button"
        />
      </div>

      {/* 🔥 Validation Messages */}
      {amount > 0 && amount < minWithdraw && (
        <p className="text-red-400 text-xs mt-2">
          Minimum withdraw amount is ₹{minWithdraw}
        </p>
      )}

      {amount > balance && (
        <p className="text-red-400 text-xs mt-2">
          Insufficient balance
        </p>
      )}
    </div>
  );
};

export default UserWithdraw;