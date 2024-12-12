"use client";

import { Dispatch, SetStateAction } from "react";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { ShippingType } from "@/types/profile";

import { AddressShipping } from "./AddressShipping";
import { Calculator } from "./Calculator";
import { Paypal } from "./Paypal";

interface Props {
  shipping: ShippingType;
  setShipping: Dispatch<SetStateAction<ShippingType>>;
  finalPrice: () => number;
  isLoadingButton: boolean;
  handleSubmitOrder: () => void;
  handleApproveOrderPaypal: () => void;
}

export const CartRight = (props: Props) => {
  const {
    shipping,
    setShipping,
    finalPrice,
    isLoadingButton,
    handleSubmitOrder,
    handleApproveOrderPaypal,
  } = props;
  return (
    <div className=" h-full lg:w-[360px] w-full flex flex-col gap-4">
      <AddressShipping shipping={shipping} setShipping={setShipping} />

      <Calculator finalPrice={finalPrice} />

      {finalPrice() > 0 && (
        <Paypal
          finalPrice={finalPrice}
          handleApproveOrderPaypal={handleApproveOrderPaypal}
        />
      )}
      <ButtonCustom
        style={"py-3 flex justify-center items-center"}
        borderRadius="rounded"
        isLoading={isLoadingButton}
        onClick={handleSubmitOrder}
      >
        <p className="font-medium text-md text-white">Mua hàng</p>
      </ButtonCustom>
    </div>
  );
};
