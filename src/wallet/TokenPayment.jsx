import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import {
  Check,
  CheckCircle,
  Wallet,
  ArrowRight,
  Shield,
  Zap,
  X,
} from "lucide-react";

// Default USDT (BSC) config - override via props if needed
const DEFAULT_USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const DEFAULT_USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const DEFAULT_CHAIN = {
  chainId: "0x38", // BSC mainnet
  chainName: "Binance Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed1.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com/"],
};

const TokenPayment = ({
  amount,
  walletType,
  onSuccess = () => { },
  onFailure = () => { },
  apiFn,
  apiBasePayload = {},
  tokenAddress = DEFAULT_USDT_ADDRESS,
  tokenAbi = DEFAULT_USDT_ABI,
  paymentAddress = import.meta.env.VITE_PAYMENT_ADDRESS,
  chainConfig = DEFAULT_CHAIN,
  storageKey = "pendingTx",
  tokenSymbol = "USDT",
  setOpenPaymentModal
}) => {
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(paymentAddress);

  // Auto switch to required chain on mount
  useEffect(() => {
    const switchToChain = async () => {
      try {
        if (!window.ethereum) return;
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (currentChainId !== chainConfig.chainId) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: chainConfig.chainId }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [chainConfig],
              });
            } else {
              throw switchError;
            }
          }
        }
      } catch (error) {
        console.error("Auto chain switch failed:", error.message);
      }
    };

    switchToChain();
  }, [chainConfig]);

  useEffect(() => {
    setRecipientAddress(paymentAddress);
  }, [paymentAddress]);

  useEffect(() => {
    if (!amount) return;
    setInvestmentAmount(amount);
  }, [amount]);


  useEffect(() => {
    const savedTx = localStorage.getItem(storageKey);
    if (!savedTx || !apiFn) return;

    const parsed = JSON.parse(savedTx);
    transactionHandler(parsed.txHash, parsed.amount, parsed.apiBasePayload)
      .then(onSuccess)
      .catch((error) => {
        if (error?.response?.status === 409 || error?.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Duplicate Transaction",
            text:
              error?.message ||
              "This transaction has already been processed.",
          });
        } else {
          onFailure();
        }
      })
      .finally(() => {
        localStorage.removeItem(storageKey);
      });
  }, [apiFn, onSuccess, onFailure, storageKey]);

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask or SafePal is not installed.",
        });
        return;
      }

      if (walletType === "safepal") {
        const isSafePal =
          window.ethereum.isSafePal ||
          navigator.userAgent.toLowerCase().includes("safepal");
        if (!isSafePal) {
          throw new Error("Please use SafePal wallet.");
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Ensure correct chain
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainConfig.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainConfig],
          });
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected wallet address:", userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  // 🔁 Common function to call backend API
  const transactionHandler = async (txHash, amountToSend, basePayload) => {
    if (!apiFn) return;

    const finalPayload = {
      ...basePayload, // dynamic payload from parent (e.g. packageId, userId)
      txResponse: txHash,
      amount: amountToSend,
    };

    try {
      await apiFn(finalPayload);
      localStorage.removeItem(storageKey);

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${amountToSend} ${tokenSymbol}.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          onSuccess();
        }
      });
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!recipientAddress) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please enter a valid recipient address",
      });
      return;
    }

    setLoading(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask or SafePal is not installed.");
      }

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== chainConfig.chainId) {
        throw new Error("Please connect to the correct network first");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenAbi,
        signer
      );

      const decimals = await tokenContract.decimals();
      const balance = await tokenContract.balanceOf(userAddress);
      const amountInToken = ethers.parseUnits(
        investmentAmount.toString(),
        decimals
      );

      if (balance < amountInToken) {
        throw new Error(`Insufficient ${tokenSymbol} balance`);
      }

      const txData = tokenContract.interface.encodeFunctionData("transfer", [
        recipientAddress,
        amountInToken,
      ]);

      const tx = await signer.sendTransaction({
        to: tokenAddress,
        data: txData,
        gasLimit: 100000,
      });

      await tx.wait();
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          txHash: tx.hash,
          amount: amount,
          apiBasePayload,
        })
      );
      await transactionHandler(tx.hash, amount, apiBasePayload);
    } catch (error) {
      console.error("Error during token transfer:", error);
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text: error.message || "Transfer failed. Please try again.",
      });
      onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[40vh] p-8 bg-gradient-to-br from-emerald-950 via-black to-emerald-950 rounded-3xl shadow-2xl border border-cyan-600 overflow-hidden">
      {loading && <h1>Loading..</h1>}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <button
                    onClick={() => setOpenPaymentModal(false)}
                    className="absolute -top-2 -right-8 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    <X className="w-8 h-8 text-gray-300 group-hover:text-gray-600" />
                  </button>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl shadow-lg shadow-emerald-500/30">
            <Wallet className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Secure Payment
          </h3>

          <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-full">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">
              Protected by {chainConfig.chainName}
            </span>
          </div>
        </div>

        {/* Amount Display */}
        <div className="bg-white/10 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="text-center">
            <p className="text-sm text-gray-200 mb-2 uppercase tracking-wider">
              Payment Amount
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                {investmentAmount}
              </span>
              <span className="text-2xl font-semibold text-emerald-400">
                {tokenSymbol}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-300">
              <Zap className="w-3 h-3" />
              <span>Fast & Secure Transaction</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!walletConnected ? (
            <button
              onClick={handleConnectWallet}
              className="group relative w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="relative flex items-center justify-center gap-3">
                <Wallet className="w-6 h-6" />
                Connect Wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ) : (
            <>
              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-full">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-emerald-400 text-lg font-semibold">
                      Wallet Connected
                    </p>
                    <p className="text-emerald-300/70 text-xs">
                      Ready for transaction
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || !walletConnected || !recipientAddress}
                className={`group relative w-full py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform overflow-hidden ${loading || !recipientAddress
                    ? "bg-slate-700 cursor-not-allowed text-slate-400 shadow-none"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {!loading && !recipientAddress && (
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                )}
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Transaction...
                    </>
                  ) : (
                    <>
                      <Check className="w-6 h-6" />
                      Confirm Payment
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Powered by {chainConfig.chainName} • Secure & Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenPayment;
