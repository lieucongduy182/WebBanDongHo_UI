import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputCustom } from "@/components/form/InputCustom";
import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal } from "@/helpers/handleModal";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { AuthService } from "@/services/auth";

export interface ForgetPasswordForm {
  username: string;
  sdt: string;
  email: string;
  quyen?: number;
}

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup
    .string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Vui lòng nhập đúng định dạng email"),
});

export const FormForgetPassword = () => {
  const { state, dispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgetPasswordForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ForgetPasswordForm) => {
    try {
      setIsLoading(true);
      await AuthService.forgetPassword({ ...data, quyen: 2 });

      handleCloseModal(state, dispatch);
      openToastSuccess("Lấy lại mật khẩu thành công, vui lòng check mail!");
    } catch (error) {
      openToastError((error as any).response.data as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <InputCustom
          name="username"
          control={control}
          errors={errors.username?.message}
          label="Username"
          placeholder="Vui lòng nhập username"
        />
      </div>

      <div className="mb-4">
        <InputCustom
          name="email"
          control={control}
          errors={errors.email?.message}
          label="Email"
          placeholder="Vui lòng nhập email"
        />
      </div>

      <div className="mb-4">
        <InputCustom
          name="sdt"
          control={control}
          errors={errors.sdt?.message}
          label="Số điện thoại"
          placeholder="Vui lòng nhập số điện thoại"
        />
      </div>

      <ButtonCustom
        type="submit"
        title="Tiếp tục"
        variant="contained"
        size="large"
        style="ease-in duration-200 hover:scale-105"
        isLoading={isLoading}
      />

      <div className="text-center mt-4">
        <span className="text-base font-normal">Bạn đã nhớ lại mật khẩu? </span>
        <span
          className="font-medium text-base text-primary cursor-pointer"
          onClick={() => {
            if (!dispatch) return;

            dispatch({
              type: "OPENMODAL",
              payload: {
                ...state,
                openModal: "Signin",
              },
            });
          }}
        >
          Đăng nhập ngay
        </span>
      </div>
    </form>
  );
};
