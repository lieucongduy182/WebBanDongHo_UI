"use client";

import { RadioGroup } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputCustom } from "@/components/form/InputCustom";
import { HeaderUser } from "@/components/ui/HeaderUser";
import { Loading } from "@/components/ui/Loading";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { profileService } from "@/services/profile";
import { OptionSelect } from "@/types/select";

import {
  CheckedRadioIcon,
  NotCheckedRadioIcon,
} from "../../../../../public/icons";

export interface UpdateUserType {
  makh: string;
  hoTen: string;
  gioiTinh: string;
  sdt: string;
  diaChi: string;
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
  makh: yup.string().required("Vui lòng nhập mã khách hàng"),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  diaChi: yup.string().required("Vui lòng nhập địa chỉ"),
  gioiTinh: yup.string().required("Vui lòng nhập giới tính"),
});

const listDataGender = [
  {
    value: "Nam",
    label: "Nam",
  },
  {
    value: "Nữ",
    label: "Nữ",
  },
];

const ProfilePage = () => {
  const { status: loginStatus, data } = useSession();
  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const {
    data: profile,
    isFetching,
    refetch,
  } = useQueryGetProfile((data?.user.name as string) || "", isAuthenticated);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      diaChi: "",
      email: "",
      gioiTinh: "",
      hoTen: "",
      sdt: "",
      makh: "",
    },
  });

  useEffect(() => {
    if (!profile?.makh) return;

    setValue("diaChi", profile.diaChi);
    setValue("hoTen", profile.hoTen);
    setValue("makh", profile.makh);
    setValue("sdt", profile.sdt);
    setValue("email", profile.email);
    setValue("gioiTinh", profile.gioiTinh);
  }, [profile]);

  const onSubmit = async (data: UpdateUserType) => {
    try {
      await profileService.updateProfile(data);

      refetch();
      openToastSuccess("Cập nhật thông tin thành công!");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  if (isFetching || loginStatus === "loading")
    return <Loading isCenter heightSpinner="h-[1000px]" />;
  return (
    <div className="p-4 lg:p-6 flex flex-col gap-8">
      <HeaderUser
        title={"Hồ sơ của tôi"}
        subTitle="Quản lý thông tin hồ sơ để bảo mật tài khoản"
      />

      <div className="border-b-[1px] border-solid border-gray-10 w-full" />

      <form
        onSubmitCapture={handleSubmit(onSubmit)}
        className="w-full flex justify-center "
      >
        <div className="flex flex-col justify-center gap-8 w-full max-w-[420px] xl:pr-10 h-full">
          <div className="mb-4">
            <InputCustom
              name="makh"
              control={control}
              errors={errors.makh?.message}
              label="Mã khách hàng"
              placeholder="Nhập mã khách hàng"
              disabled={true}
            />
          </div>

          <div className="mb-4">
            <InputCustom
              name="hoTen"
              control={control}
              errors={errors.hoTen?.message}
              label="Họ Tên"
              placeholder="Nhập họ tên"
            />
          </div>

          <div className="mb-4">
            <InputCustom
              name="email"
              control={control}
              errors={errors.email?.message}
              label="Email"
              placeholder="Nhập email"
            />
          </div>

          <div className="mb-4">
            <Controller
              name={"gioiTinh"}
              control={control}
              defaultValue={profile?.gioiTinh}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="w-full">
                    <div className=" w-full">
                      <RadioGroup value={value} onChange={onChange}>
                        <RadioGroup.Label className="text-md font-medium">
                          Giới tính
                        </RadioGroup.Label>
                        <div className="w-full flex justify-between xl:gap-x-10 gap-x-4 items-center">
                          {listDataGender.map((option: OptionSelect) => (
                            <RadioGroup.Option
                              key={option.value}
                              value={option.value}
                              className={() =>
                                ` relative flex cursor-pointer rounded-lg pt-2 focus:outline-none w-full`
                              }
                            >
                              {({ checked }) => (
                                <>
                                  <div className="flex w-full items-center">
                                    <div className="shrink-0 text-white mr-2">
                                      {checked ? (
                                        <CheckedRadioIcon />
                                      ) : (
                                        <NotCheckedRadioIcon />
                                      )}
                                    </div>

                                    <div className="flex items-center flex-1">
                                      <div className="text-sm w-full">
                                        <RadioGroup.Label
                                          as="div"
                                          className={`text-md w-full xs:min-w-[82px] p-4 flex justify-center items-center border-[1px] border-solid border-gray-20 rounded-lg ${
                                            checked
                                              ? "text-primary font-bold"
                                              : "text-[#808089] font-normal"
                                          }`}
                                        >
                                          {option.label}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div className="mb-4">
            <InputCustom
              name="sdt"
              control={control}
              errors={errors.sdt?.message}
              label="Số điện thoại"
              placeholder="Nhập sdt"
            />
          </div>

          <div className="mb-4">
            <InputCustom
              name="diaChi"
              control={control}
              errors={errors.diaChi?.message}
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
            />
          </div>

          <ButtonCustom
            type="submit"
            title="Đăng ký"
            variant="contained"
            size="large"
            style="ease-in duration-200 hover:scale-105"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
