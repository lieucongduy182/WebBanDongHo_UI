import { Dispatch, SetStateAction } from "react";

import { ShippingType } from "@/types/profile";

import { ModalLayoutAuth } from "../../ModalLayout/ModalLayoutAuth";
import { FormChangeShipping } from "./FormChangeShipping";

interface Props {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  setShipping: Dispatch<SetStateAction<ShippingType>>;
}

export const ModalChangeShipping = (props: Props) => {
  const { isOpenModal, setIsOpenModal, setShipping } = props;
  return (
    <>
      <ModalLayoutAuth
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        title="Đổi địa chỉ giao hàng"
        description="Vui lòng điền đầy đủ các thông tin giao hàng"
        form={
          <div className="my-6">
            <FormChangeShipping
              setShipping={setShipping}
              setIsOpenModal={setIsOpenModal}
            />
          </div>
        }
        isShowSocials={true}
      />
    </>
  );
};
