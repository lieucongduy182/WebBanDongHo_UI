import { ProductType } from "./product";
import { ProfileType } from "./profile";

export interface CommentType {
  mabl: string;
  noidung: string;
  time: string;
  khachhang: ProfileType;
  sanpham: ProductType;
}

export interface CommentFormType {
  noidung: string;
  makh: string;
  masp: string;
}
