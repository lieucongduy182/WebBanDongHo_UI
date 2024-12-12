import { CartType } from "./cart";
import { ProductType } from "./product";
import { ProfileType } from "./profile";

export interface ProductOrderType {
  masp: string;
  soluong: number;
  dongia: number;
}

export interface AddOrderType {
  hinhThucThanhToan: number;
  hoTen: string;
  diaChi: string;
  sdt: string;
  email: string;
  ghichu: string;
  makh: string;
  dsSanPham: ProductOrderType[];
}

export interface OrderType {
  madh: string;
  hinhThucThanhToan: number;
  ngayDat: string;
  tongTien: number;
  trangThai: number;
  hoTen: string;
  diaChi: string;
  sdt: string;
  email: string;
  ghichu: string;
  nhanvien: null;
  giaohang: null;
  khachhang: ProfileType;
}

export interface OrderDetailType extends CartType {}

export interface UpdateDonHangFormType {
  madh: string;
  manv?: string;
  manvgh?: string;
  trangthai: number;
  hinhThucThanhToan: number;
}
