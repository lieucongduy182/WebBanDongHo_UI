import { useContext } from "react";

import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal } from "@/helpers/handleModal";

import { ModalLayoutAuth } from "../../ModalLayout/ModalLayoutAuth";
import { FormSignUp } from "./FormSignup";

export const ModalSignup = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <ModalLayoutAuth
        isOpen={state.openModal.includes("Signup")}
        closeModal={() => handleCloseModal(state, dispatch)}
        title="Đăng ký"
        description="Chào mừng bạn đã đến với chúng tôi"
        form={
          <div className="my-6">
            <FormSignUp />
          </div>
        }
        isShowSocials={true}
      />
    </>
  );
};
