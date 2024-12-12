import { orderService } from "@/services/order";

export const getDetailOrderQueryFn = async (madh: string) => {
  const { data } = await orderService.getDetailOrder(madh);

  return data;
};

export const getListOrderQueryFn = async (makh: string) => {
  const { data } = await orderService.getListOrder(makh);

  return data;
};
