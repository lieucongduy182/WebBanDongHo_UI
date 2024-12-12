import { cartService } from "@/services/cart";

export const getAllCartUserQueryFn = async (makh: string) => {
  const { data } = await cartService.getAllCartUser(makh);

  return data;
};
