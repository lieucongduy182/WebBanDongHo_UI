import axiosClient from "..";

export const supplierService = {
  getAllSupplier: () => axiosClient.get("/nhacungcap"),
  getDetailSupplier: (mancc: string) => axiosClient.get(`/nhacungcap/${mancc}`),
};
