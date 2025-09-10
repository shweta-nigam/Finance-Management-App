import React from "react";
import { PiggyBank } from "lucide-react";

const CoinAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-40 flex items-end justify-end px-10 overflow-hidden mb-0">
      {/* Piggy Bank */}
      <PiggyBank className="w-20 h-20 text-blue-900 relative z-10" />

      {/* Coins */}
      <div className="absolute left-0 bottom-10 w-8 h-8 bg-yellow-400 rounded-full animate-[rollCoin_4s_linear_infinite]" />
      <div className="absolute left-0 bottom-20 w-6 h-6 bg-yellow-300 rounded-full animate-[rollCoin_6s_linear_infinite]" />

      {/* Keyframes */}
      <style>
        {`
          @keyframes rollCoin {
            0% { transform: translateX(-100px) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateX(80vw) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default CoinAnimation;
