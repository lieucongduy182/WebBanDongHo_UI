import { useContext } from "react";

import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal } from "@/helpers/handleModal";

import { ModalLayoutAuth } from "../../ModalLayout/ModalLayoutAuth";
import { FormForgetPassword } from "./FormForgetPassword";

export const ModalForgetPassword = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <ModalLayoutAuth
      isOpen={state.openModal.includes("ForgetPassword")}
      closeModal={() => handleCloseModal(state, dispatch)}
      title="Lấy lại mật khẩu"
      description="Điền đầy đủ thông tin để lấy lại mật khẩu"
      form={
        <div className="my-6">
          <FormForgetPassword />
        </div>
      }
      isShowSocials={true}
    />
  );
};
