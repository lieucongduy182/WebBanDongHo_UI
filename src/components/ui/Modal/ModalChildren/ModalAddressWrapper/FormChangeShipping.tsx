import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { InputCustom } from "@/components/form/InputCustom";
import { openToastSuccess } from "@/helpers/toast";
import { ShippingType } from "@/types/profile";

const schema = yup.object().shape({
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  diaChi: yup.string().required("Vui lòng nhập địa chỉ"),
  email: yup
    .string()
    .email("Vui lòng nhập đúng định dàng")
    .required("Vui lòng nhập email"),
});

interface Props {
  setShipping: Dispatch<SetStateAction<ShippingType>>;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const FormChangeShipping = (props: Props) => {
  const { setShipping, setIsOpenModal } = props;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ShippingType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      diaChi: "",
      email: "",
      hoTen: "",
      sdt: "",
    },
  });

  const onSubmit = async (data: ShippingType) => {
    setShipping(data);
    reset();
    setIsOpenModal(false);
    openToastSuccess("Cập nhật địa chỉ thành công");
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="mb-4">
          <InputCustom
            name="hoTen"
            control={control}
            errors={errors.hoTen?.message}
            label="Họ tên"
            placeholder="Nhập họ tên"
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

        <div className="mb-4">
          <InputCustom
            name="sdt"
            control={control}
            errors={errors.sdt?.message}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
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

      <ButtonCustom
        type="submit"
        title="Cập nhật"
        variant="contained"
        size="large"
        style="ease-in duration-200 hover:scale-105"
      />
    </form>
  );
};
