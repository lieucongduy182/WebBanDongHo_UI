"use client";

import clsx from "clsx";

import { CartType } from "@/types/cart";

interface Props {
  item: CartType;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

export const CountQuantityProduct = (props: Props) => {
  const { item, handleIncrease, handleDecrease } = props;

  return (
    <div className="flex items-center h-full gap-4">
      <button
        onClick={handleDecrease}
        className={`${"cursor-pointer"} w-[16px] h-[16px] rounded-[100px] flex justify-center items-center border-[1px] border-solid border-gray-20 opacity-50`}
      >
        <MinusSmall />
      </button>
      <div
        className={clsx(
          "font-medium text-base px-3 py-1 border-[1px] border-opacity-50 border-gray-20 border-solid",
        )}
      >
        {item.soluong}
      </div>
      <button
        onClick={() => handleIncrease()}
        className={clsx(
          "w-[16px] h-[16px] rounded-[100px] flex justify-center items-center border-[1px] border-solid border-gray-20 opacity-50",
          "cursor-pointer",
        )}
      >
        <PlusSmall />
      </button>
    </div>
  );
};

const MinusSmall = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M8.02781 5.48633L3.04395 5.48633"
        stroke="#808089"
        strokeWidth="0.830644"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PlusSmall = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M5.44555 2.99414L5.44555 7.97801M7.93748 5.48607L2.95361 5.48607"
        stroke="#808089"
        strokeWidth="0.830644"
        strokeLinecap="round"
      />
    </svg>
  );
};
