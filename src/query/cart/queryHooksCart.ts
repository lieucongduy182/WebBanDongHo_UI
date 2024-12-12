import { useQuery } from "@tanstack/react-query";

import { CartType } from "@/types/cart";

import { getAllCartUserQueryFn } from "./queryFnsCart";
import { QueryKeysCart } from "./queryKeysCart";

export const initialAllCartUser: CartType[] = [];

export const useQueryGetAllCartUser = (makh: string) =>
  useQuery<CartType[]>({
    queryKey: [QueryKeysCart.GET_ALL_CART_USER],
    queryFn: () => getAllCartUserQueryFn(makh),
    placeholderData: initialAllCartUser,
    enabled: !!makh,
  });
