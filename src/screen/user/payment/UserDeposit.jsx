import React, { useState } from "react";
import { Coins, Wallet, CreditCard, ShieldCheck } from "lucide-react";
import ReusableForm from "../../../components/ui/ReusableForm";
import ReusableButton from "../../../components/ui/ReusableButton";
import { userDepositApi } from "../../../api/user.api";
import WalletOptionModal from "../../../wallet/WalletOptionModal";
import TokenPayment from "../../../wallet/TokenPayment";

const UserDeposit = () => {
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);

  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleDeposit = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }
    setFinalAmount(amount);
    setOpenWalletModal(true);
  };

  const handleWalletSelect = (walletId) => {
    setSelectedWallet(walletId);
    setOpenWalletModal(false);
    setOpenPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setOpenPaymentModal(false);
    setSelectedWallet(null);
    setAmount("");
    setFinalAmount(null);
  };

  const handlePaymentFailure = () => {
    console.log("Payment failed");
  };

  return (
    <>
      {/* Container */}
      <div className="w-full border border-slate-700 rounded-xl shadow-xl backdrop-blur-md p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1.4fr] gap-10">

        {/* LEFT SIDE — Crypto Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-6">

          {/* Circle Wallet Icon */}
          <div className="relative">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
              <Wallet className="h-20 w-20 text-white" />
            </div>

            <div className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2 px-2">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Secure Wallet Deposit
            </h2>
            <p className="text-sm text-slate-300">
              Add funds into your wallet with a fast, encrypted deposit system.
            </p>
          </div>

          {/* Info Cards */}
          <div className="w-full mt-2 grid grid-cols-1 gap-3 text-sm">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
              <p className="text-slate-300 font-medium">Instant Confirmation</p>
              <p className="text-xs text-slate-400 mt-1">
                Your deposit gets verified immediately after payment.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
              <p className="text-slate-300 font-medium">Multiple Wallet Options</p>
              <p className="text-xs text-slate-400 mt-1">
                Choose any wallet or token to complete your deposit safely.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[var(--btnColor)] text-center lg:text-left">
            Deposit
          </h1>

          <ReusableForm
            label="Deposit Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to deposit"
            required={true}
            icon={Coins}
          />

          <ReusableButton
            label="Deposit Now"
            type="button"
            variant="primary"
            onClick={handleDeposit}
            icon={CreditCard}
          />
        </div>
      </div>

      {/* Wallet Selection Modal */}
      <WalletOptionModal
        isOpen={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
        onSelectWallet={handleWalletSelect}
      />

      {/* Payment Modal */}
      {openPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative w-full max-w-xl mx-4">
            <TokenPayment
              setOpenPaymentModal={setOpenPaymentModal}
              amount={finalAmount}
              walletType={selectedWallet}
              apiFn={userDepositApi}
              apiBasePayload={{}}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDeposit;
