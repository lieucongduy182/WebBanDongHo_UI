import { OptionSelect } from "@/types/select";

export const listOptionTrangThai: OptionSelect[] = [
  {
    value: 0,
    label: "Chưa xác nhận",
    color: "text-black",
  },
  {
    value: 1,
    label: "Đã xác nhận",
    color: "text-primary",
  },
  {
    value: 2,
    label: "Đang giao hàng",
    color: "tex-theme",
  },
  {
    value: 3,
    label: "Hoàn thành",
    color: "text-success",
  },
  {
    value: 4,
    label: "Đã huỷ",
    color: "text-error",
  },
];

export const dataTrangthai = (trangthai: number) => {
  const findTrangThai = listOptionTrangThai.find(
    // eslint-disable-next-line prettier/prettier
    (item) => Number(item.value) === trangthai
  );

  return findTrangThai;
};

export const textHinhThucThanhThoan = (hinhthuc: number) => {
  if (hinhthuc === 1) {
    return "Thanh toán khi nhận hàng";
  }

  return "Paypal";
};
