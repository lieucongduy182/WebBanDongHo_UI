"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { ModalChangeShipping } from "@/components/ui/Modal/ModalChildren/ModalAddressWrapper";
import { ShippingType } from "@/types/profile";

interface Props {
  shipping: ShippingType;
  setShipping: Dispatch<SetStateAction<ShippingType>>;
}

export const AddressShipping = (props: Props) => {
  const { shipping, setShipping } = props;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="bg-white lg:w-[360px] w-full h-full p-4 flex flex-col gap-2 rounded-lg ">
        <div className="flex justify-between items-center">
          <p className="font-medium text-base text-gray-60">Giao hàng tới</p>
          <ButtonCustom
            onClick={() => setIsOpenModal(true)}
            variant="text"
            fontWeight="font-normal"
            width="w-max"
          >
            Thay đổi
          </ButtonCustom>
        </div>

        <div className="flex flex-col  gap-2">
          <p className="font-medium text-md text-gray-90">
            Họ tên: {shipping.hoTen}
          </p>
          <p className="font-medium text-md text-gray-90">
            SĐT: {shipping.sdt}
          </p>
          <p className="font-medium text-md text-gray-90">
            Email: {shipping.email}
          </p>
          <p className="font-medium text-md text-gray-90">
            Địa chỉ: {shipping.diaChi}
          </p>
        </div>
      </div>

      {isOpenModal && (
        <ModalChangeShipping
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setShipping={setShipping}
        />
      )}
    </>
  );
};
