import { useQuery } from "@tanstack/react-query";

import { SupplierType } from "@/types/supplier";

import { getDetailSupplierQueryFn } from "./queryFnsSupplier";
import { QueryKeysSupplier } from "./queryKeysSupplier";

export const initialCategoryDetail: SupplierType = {
  mancc: "",
  slug: "",
  tenncc: "",
  diachi: "",
  email: "",
  sdt: "",
};

export const useQueryGetSupplierDetail = (mancc: string) =>
  useQuery<SupplierType>({
    queryKey: [QueryKeysSupplier.GET_DETAIL_SUPPLIER, mancc],
    queryFn: () => getDetailSupplierQueryFn(mancc),
    placeholderData: initialCategoryDetail,
  });
