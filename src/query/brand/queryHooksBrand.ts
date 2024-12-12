import { useQuery } from "@tanstack/react-query";

import { BrandType } from "@/types/brand";

import { getDetailBrandQueryFn } from "./queryFnsBrand";
import { QueryKeysBrand } from "./queryKeysBrand";

export const initialBrandDetail: BrandType = {
  math: "",
  slug: "",
  tenth: "",
};

export const useQueryGetBrandDetail = (math: string) =>
  useQuery<BrandType>({
    queryKey: [QueryKeysBrand.GET_DETAIL_BRAND, math],
    queryFn: () => getDetailBrandQueryFn(math),
    placeholderData: initialBrandDetail,
  });
