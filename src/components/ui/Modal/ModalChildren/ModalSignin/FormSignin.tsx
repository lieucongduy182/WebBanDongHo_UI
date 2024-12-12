import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputCustom } from "@/components/form/InputCustom";
import { InputPasswordCustom } from "@/components/form/InputCustomPassword";
import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal, handleOpenModal } from "@/helpers/handleModal";
import { LoginFormType } from "@/services/auth/type";

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export const FormSignin = () => {
  const { state, dispatch } = useContext(AppContext);

  const [errorMessage, setErrorsMessage] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormType) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.error) {
      setErrorsMessage(
        "Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại!",
      );
      return;
    }

    handleCloseModal(state, dispatch);
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <InputCustom
          name="username"
          control={control}
          errors={errors.username?.message}
          label="Username"
          placeholder="Nhập username"
        />
      </div>

      <div className="mb-4">
        <InputPasswordCustom
          name="password"
          control={control}
          errors={errorMessage || errors.password?.message}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
        />
      </div>

      <div
        className="mb-6 text-right text-primary text-base font-medium cursor-pointer"
        onClick={() => handleOpenModal(state, dispatch, "ForgetPassword")}
      >
        Quên mật khẩu?
      </div>

      <ButtonCustom
        type="submit"
        title="Tiếp tục"
        variant="contained"
        size="large"
        style="ease-in duration-200 hover:scale-105"
      />

      <div className="text-center mt-4">
        <span className="text-base font-normal">Bạn chưa là thành viên? </span>
        <span
          className="font-medium text-base text-primary cursor-pointer"
          onClick={() => {
            if (!dispatch) return;

            dispatch({
              type: "OPENMODAL",
              payload: {
                ...state,
                openModal: "Signup",
              },
            });
          }}
        >
          Đăng ký ngay
        </span>
      </div>
    </form>
  );
};
