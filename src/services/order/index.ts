import { AddOrderType, UpdateDonHangFormType } from "@/types/order";

import axiosClient from "..";

export const orderService = {
  addOrder: (formData: AddOrderType) =>
    axiosClient.post(`/donhang/user`, formData),
  getListOrder: (makh: string) => axiosClient.get(`/donhang/user/${makh}`),
  getDetailOrder: (madh: string) => axiosClient.get(`/donhang/detail/${madh}`),
  updateDonHang: (formData: UpdateDonHangFormType) =>
    axiosClient.put(`/donhang/user`, formData),
};
