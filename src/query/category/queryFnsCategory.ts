import { categoryService } from "@/services/category";

export const getDetailCategoryQueryFn = async (madm: string) => {
  const { data } = await categoryService.getDetailCategory(madm);

  return data;
};
