import { brandService } from "@/services/brand";

export const getDetailBrandQueryFn = async (brand: string) => {
  const { data } = await brandService.getDetailBrand(brand);

  return data;
};
