import { ProductType } from "./product";
import { ProfileType } from "./profile";

export interface AddCartForm {
  makh: string;
  masp: string;
  soluong: number;
}

export interface CartId {
  makh: string;
  masp: string;
}

export interface CartType {
  soluong: number;
  gia: number;
  khachhang: ProfileType;
  sanpham: ProductType;
  id: CartId;
}
