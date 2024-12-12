import axiosClient from "..";

export const categoryService = {
  getAllCategory: () => axiosClient.get("/danhmuc"),
  getDetailCategory: (madm: string) => axiosClient.get(`/danhmuc/${madm}`),
};
