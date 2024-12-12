import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AnyObject, TestContext } from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputCustom } from "@/components/form/InputCustom";
import { InputPasswordCustom } from "@/components/form/InputCustomPassword";
import { AppContext } from "@/contexts/app.contexts";
import { handleCloseModal } from "@/helpers/handleModal";
import { openToast } from "@/helpers/toast";
import { AuthService } from "@/services/auth";
import { RegisterFormType } from "@/services/auth/type";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  username: yup.string().required("Vui lòng nhập username"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(
      6,
      "Mật khẩu phải trên 6 kí tự, có chữ hoa, chữ thường, số và kí tự đặc biệt",
    ),
  passwordConfirmation: yup
    .string()
    .trim()
    .required("Vui lòng nhập xác nhận mật khẩu")
    .test(
      "empty",
      "Xác nhận mật khẩu không trùng khớp",
      (
        confirm_password: string | undefined,
        testContext: TestContext<AnyObject>,
      ): boolean => {
        if (!testContext.parent.password) return true;
        return testContext.parent.password === confirm_password;
      },
    ),
  hoten: yup.string().required("Vui lòng nhập họ tên"),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  diachi: yup.string().required("Vui lòng nhập địa chỉ"),
  gioitinh: yup.string().required("Vui lòng nhập giới tính"),
});

export const FormSignUp = () => {
  const { state, dispatch } = useContext(AppContext);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      diachi: "",
      email: "",
      gioitinh: "",
      hoten: "",
      password: "",
      passwordConfirmation: "",
      sdt: "",
      username: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      const response = await AuthService.signUpWithCredentials({
        ...data,
      });

      openToast("success", response.data);
      reset();
      handleCloseModal(state, dispatch);
    } catch (error) {
      openToast("error", (error as any).response.data);
    }
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <div className="mb-4">
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
            errors={errors.password?.message}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="mb-4">
          <InputPasswordCustom
            name="passwordConfirmation"
            control={control}
            errors={errors.passwordConfirmation?.message}
            label="Nhập lại mật khẩu"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="mb-4">
          <InputCustom
            name="hoten"
            control={control}
            errors={errors.hoten?.message}
            label="Họ và tên"
            placeholder="Nhập họ tên"
          />
        </div>
        <InputCustom
          name="email"
          control={control}
          errors={errors.email?.message}
          label="Email"
          placeholder="Nhập email"
        />
      </div>

      <div className="mb-4">
        <InputCustom
          name="diachi"
          control={control}
          errors={errors.diachi?.message}
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div className="mb-4">
        <InputCustom
          name="sdt"
          control={control}
          errors={errors.sdt?.message}
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div className="mb-4">
        <InputCustom
          name="gioitinh"
          control={control}
          errors={errors.gioitinh?.message}
          label="Giới tính"
          placeholder="Nhập giới tính"
        />
      </div>

      <ButtonCustom
        type="submit"
        title="Đăng ký"
        variant="contained"
        size="large"
        style="ease-in duration-200 hover:scale-105"
      />

      <div className="text-center mt-4">
        <span className="text-base">Bạn đã sẵn sàng đăng nhập? </span>
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
          Đăng nhập
        </span>
      </div>
    </form>
  );
};
