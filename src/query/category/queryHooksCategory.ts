import { useQuery } from "@tanstack/react-query";

import { CategoryType } from "@/types/category";

import { getDetailCategoryQueryFn } from "./queryFnsCategory";
import { QueryKeysCategory } from "./queryKeysCategory";

export const initialCategoryDetail: CategoryType = {
  madm: "",
  slug: "",
  tendm: "",
};

export const useQueryGetCategoryDetail = (madm: string) =>
  useQuery<CategoryType>({
    queryKey: [QueryKeysCategory.GET_DETAIL_CATEGORY, madm],
    queryFn: () => getDetailCategoryQueryFn(madm),
    placeholderData: initialCategoryDetail,
  });
