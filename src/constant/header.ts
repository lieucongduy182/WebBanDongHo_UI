/* eslint-disable no-unused-vars */

import { OptionSelect } from "@/types/select";

export enum SearchValueType {
  SanPham = "SanPham",
  DanhMuc = "DanhMuc",
  ThuongHieu = "ThuongHieu",
  NhaCungCap = "NhaCungCap",
}

export const listDropDownSearch: OptionSelect[] = [
  {
    label: "Sản phẩm",
    value: SearchValueType.SanPham,
  },
  // {
  //   label: "Danh mục",
  //   value: SearchValueType.DanhMuc,
  // },
  // {
  //   label: "Thương hiệu",
  //   value: SearchValueType.ThuongHieu,
  // },
  // {
  //   label: "Nhà cung cấp",
  //   value: SearchValueType.NhaCungCap,
  // },
];
