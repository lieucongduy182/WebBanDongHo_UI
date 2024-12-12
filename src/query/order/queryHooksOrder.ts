import { useQuery } from "@tanstack/react-query";

import { OrderDetailType, OrderType } from "@/types/order";

import { initialProductDetail } from "../product/queryHooksProduct";
import { getDetailOrderQueryFn, getListOrderQueryFn } from "./queryFnsOrder";
import { QueryKeysOrder } from "./queryKeysOrder";

export const initialListOrder: OrderType[] = [];

export const initialOrderDetail: OrderDetailType[] = [];

// {
//   gia: 0,
//   id: {
//     madh: "",
//     masp: "",
//   },
//   sanpham: initialProductDetail,
//   soluong: 0,
// };

export const useQueryGetListOrder = (makh: string) =>
  useQuery<OrderType[]>({
    queryKey: [QueryKeysOrder.GET_LIST_ORDER_USER],
    queryFn: () => getListOrderQueryFn(makh),
    placeholderData: initialListOrder,
    enabled: !!makh,
  });

export const useQueryGetDetailOrder = (madh: string) =>
  useQuery<OrderDetailType[]>({
    queryKey: [QueryKeysOrder.GET_DETAIL_ORDER],
    queryFn: () => getDetailOrderQueryFn(madh),
    placeholderData: initialOrderDetail,
    enabled: !!madh,
  });
