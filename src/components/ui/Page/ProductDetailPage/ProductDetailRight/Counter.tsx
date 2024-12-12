"use client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stock: number;
}

const Counter = (props: Props) => {
  const { quantity, setQuantity, stock } = props;

  const handleDecrease = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity >= stock) return;
    setQuantity(quantity + 1);
  };
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-full border border-gray-20 p-1"
        onClick={handleDecrease}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3221 7.55713L3.78833 7.55713"
            stroke="#808089"
            strokeWidth="1.25563"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="py-1 px-4 font-medium text-xl leading-7.5 border border-gray-20">
        {quantity}
      </div>

      <button
        className="rounded-full border border-gray-20 p-1"
        onClick={handleIncrease}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.55521 3.79028L7.55521 11.324M11.3221 7.55716L3.78833 7.55716"
            stroke="#808089"
            strokeWidth="1.25563"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
