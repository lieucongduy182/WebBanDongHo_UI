import { useContext } from "react";

import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal } from "@/helpers/handleModal";

import { ModalLayoutAuth } from "../../ModalLayout/ModalLayoutAuth";
import { FormSignin } from "./FormSignin";

export const ModalSignin = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <ModalLayoutAuth
      isOpen={state.openModal.includes("Signin")}
      closeModal={() => handleCloseModal(state, dispatch)}
      title="Đăng Nhập"
      description="Chào mừng bạn đã đến với chúng tôi"
      form={
        <div className="my-6">
          <FormSignin />
        </div>
      }
      isShowSocials={true}
    />
  );
};
