"use client";

import { ConvertPrice } from "@/helpers/convert";

const stylePayments = "font-medium text-[#121212] text-base";

interface Props {
  finalPrice: () => number;
}

export const Calculator = (props: Props) => {
  const { finalPrice } = props;
  return (
    <div className="bg-blue-10 w-full lg:w-[360px] shadow-[0px_1px_1px_0px_rgba(31, 79, 224, 0.25)] rounded flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <p className={stylePayments}>Phí vận chuyển</p>
        <p className={stylePayments}>{ConvertPrice(0)}</p>
      </div>

      <div className="flex flex-col gap-2s">
        <div className="flex justify-between items-center">
          <p className={"font-bold text-md"}>Tổng tiền</p>
          <p className={"font-bold text-md"}>
            <span className={stylePayments}>
              {finalPrice() > 0 ? ConvertPrice(finalPrice()) : "0đ"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
