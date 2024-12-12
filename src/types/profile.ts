export interface LoginResponseType {
  quyen: 1 | 2 | 3;
  username: string;
}

export interface TaiKhoanType {
  username: string;
}

export interface ProfileType {
  makh: string;
  gioiTinh: string;
  hoTen: string;
  sdt: string;
  diaChi: string;
  email: string;
  taikhoan: TaiKhoanType;
}

export interface ShippingType {
  hoTen: string;
  sdt: string;
  diaChi: string;
  email: string;
}
