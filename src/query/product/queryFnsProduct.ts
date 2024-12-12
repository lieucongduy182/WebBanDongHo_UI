import { ProductService } from "@/services/product";

export const getAllProductQueryFn = async () => {
  const { data } = await ProductService.getAllProduct();

  return data;
};

export const getBestSellerProductQueryFn = async () => {
  const { data } = await ProductService.getBestSeller();

  return data;
};

export const getProductBySearchQueryFn = async (params: any) => {
  const { data } = await ProductService.getProductsBySearch(params);

  return data;
};

export const getDetailProductQueryFn = async (slug: string) => {
  const { data } = await ProductService.getDetailProduct(slug);

  return data;
};

export const getProductByCategoryQueryFn = async (category: string) => {
  const { data } = await ProductService.getProductsByCategory(category);

  return data;
};

export const getProductByBrandQueryFn = async (brand: string) => {
  const { data } = await ProductService.getProductsByBrand(brand);

  return data;
};

export const getProductBySupplierQueryFn = async (supplier: string) => {
  const { data } = await ProductService.getProductsBySupplier(supplier);

  return data;
};
