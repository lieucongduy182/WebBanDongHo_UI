import { AddCartForm } from "@/types/cart";

import axiosClient from "..";

export const cartService = {
  getAllCartUser: (makh: string) => axiosClient.get(`/giohang/${makh}`),
  addCart: (formData: AddCartForm) => axiosClient.post(`/giohang`, formData),
  deleteAllCartUser: (makh: string) => axiosClient.delete(`/giohang/${makh}`),
  deleteCartItemUser: (makh: string, masp: string) =>
    axiosClient.delete(`/giohang/${makh}/${masp}`),
};
