import { X } from "lucide-react";

const DEFAULT_WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "https://img.icons8.com/color/48/metamask-logo.png",
    description: "Connect using browser extension",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    id: "safepal",
    name: "SafePal",
    icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/8119.png",
    description: "Secure hardware wallet",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    icon: "https://avatars.githubusercontent.com/u/32179889?s=200&v=4",
    description: "Mobile-first crypto wallet",
    gradient: "from-blue-500 to-indigo-600",
  },
];


const WalletOptionModal = ({
  isOpen,
  onClose,
  onSelectWallet,
  wallets = DEFAULT_WALLETS,
}) => {
  if (!isOpen) return null;

  const handleSelect = (walletId) => {
    if (onSelectWallet) onSelectWallet(walletId);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/5 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-emerald-950 via-black to-emerald-950 border !border-gray-500 rounded-2xl shadow-2xl max-w-lg w-full mx-auto transform transition-all duration-300 animate-scale-in">
        <div className="relative px-6 py-4 border-b border-white-100">
          <h2 className="text-3xl font-bold text-white-800 text-center">
            Choose Wallet
          </h2>
          <p className="text-lg text-gray-300 text-center mt-1">
            Connect your preferred wallet to continue
          </p>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
          >
            <X className="w-8 h-8 text-gray-300 group-hover:text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {wallets.map((wallet, index) => (
            <button
              key={wallet.id}
              onClick={() => handleSelect(wallet.id)}
              className="w-full p-4 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 group bg-gradient-to-r hover:from-gray-50 hover:to-white transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${wallet.gradient} p-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-xl text-white group-hover:!text-gray-900 transition-colors">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-gray-300 group-hover:text-gray-600 transition-colors">
                    {wallet.description}
                  </p>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white rounded-b-2xl">
          <p className="text-sm text-gray-800 text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WalletOptionModal;
