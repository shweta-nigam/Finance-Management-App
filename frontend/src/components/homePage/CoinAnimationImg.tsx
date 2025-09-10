import React from "react";

const CoinAnimationImg: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-40 flex items-end justify-end px-10 overflow-hidden pointer-events-none">
      <img
        src="/coin/piggy_bank_1.png" 
        alt="Piggy Bank"
        className="w-24 h-24 relative z-10"
      />

      {/* Coin 1 */}
      <img
        src="/coin/coin_1.png" // your coin image
        alt="Coin 1"
        className="absolute left-0 bottom-10 w-10 h-10 animate-[rollCoin_5s_linear_infinite]"
      />

      <img
        src="/coin/coin_2.png"
        alt="Coin 2"
        className="absolute left-0 bottom-20 w-8 h-8 animate-[rollCoin_6s_linear_infinite]"
      />
      <img
        src="/coin/coin_3.jpg"
        alt="Coin 3"
        className="absolute left-0 bottom-14 w-9 h-9 animate-[rollCoin_7s_linear_infinite]"
      />


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

export default CoinAnimationImg;
