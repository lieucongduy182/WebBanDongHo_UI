import axiosClient from "..";

export const brandService = {
  getAllBrand: () => axiosClient.get("/thuonghieu"),
  getDetailBrand: (math: string) => axiosClient.get(`/thuonghieu/${math}`),
};
