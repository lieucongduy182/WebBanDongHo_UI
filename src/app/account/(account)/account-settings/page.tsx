"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AnyObject, TestContext } from "yup";
import * as yup from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputPasswordCustom } from "@/components/form/InputCustomPassword";
import { HeaderUser } from "@/components/ui/HeaderUser";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { profileService } from "@/services/profile";

export interface ChangePasswordForm {
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
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
});

const SettingsPage = () => {
  const { status: loginStatus, data } = useSession();
  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await profileService.changePassword({
        password: data.password,
        username: profile?.taikhoan.username || "",
      });

      reset();
      openToastSuccess("Đổi mật khẩu thành công!");
    } catch (message: any) {
      openToastError("Đã xảy ra lỗi, đổi mật khẩu thất bại");
    }
  };

  return (
    <>
      <div className="p-4 lg:p-6 flex flex-col gap-20">
        <div className="flex flex-col gap-8">
          <HeaderUser
            title={"Hồ sơ của tôi"}
            subTitle="Quản lý thông tin hồ sơ để bảo mật tài khoản"
          />

          <div className="border-b-[1px] border-solid border-gray-10  w-full" />

          <form
            onSubmitCapture={handleSubmit(onSubmit)}
            className="w-full flex  justify-center"
          >
            <div className="flex flex-col  max-w-[420px]   max gap-8 w-full h-full">
              <div>
                <InputPasswordCustom
                  name="password"
                  control={control}
                  errors={errors.password?.message}
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <div>
                <InputPasswordCustom
                  name="passwordConfirmation"
                  control={control}
                  errors={errors.passwordConfirmation?.message}
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <ButtonCustom
                width="max-w-max"
                style="px-10 py-4 font-medium"
                type="submit"
              >
                Lưu thay đổi
              </ButtonCustom>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
