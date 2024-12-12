import { useQuery } from "@tanstack/react-query";

import { ProductType } from "@/types/product";

import {
  getAllProductQueryFn,
  getBestSellerProductQueryFn,
  getDetailProductQueryFn,
  getProductByBrandQueryFn,
  getProductByCategoryQueryFn,
  getProductBySearchQueryFn,
  getProductBySupplierQueryFn,
} from "./queryFnsProduct";
import { QueryKeysProduct } from "./queryKeysProduct";

const initialProductList: ProductType[] = [];

export const initialProductDetail: ProductType = {
  masp: "",
  tensp: "",
  slug: "",
  soluong: 0,
  dongia: 0,
  chitietSP: "",
  image: "",
  image2: "",
  image3: "",
  trangthai: 0,
  thuonghieu: {
    math: "",
    tenth: "",
    slug: "",
  },
  danhmuc: {
    madm: "",
    tendm: "",
    slug: "",
  },
  nhacungcap: {
    mancc: "",
    tenncc: "",
    sdt: "",
    email: "",
    diachi: "",
    slug: "",
  },
};

export const useQueryGetAllProduct = () =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_ALL_PRODUCT],
    queryFn: () => getAllProductQueryFn(),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetBestSellerProduct = () =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_BEST_SELLER],
    queryFn: () => getBestSellerProductQueryFn(),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetProductByCategory = (category: string) =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_PRODUCT_CATEGORY, category],
    queryFn: () => getProductByCategoryQueryFn(category),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetProductByBrand = (brand: string) =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_PRODUCT_BRAND, brand],
    queryFn: () => getProductByBrandQueryFn(brand),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetProductBySupplier = (supplier: string) =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_PRODUCT_SUPPLIER, supplier],
    queryFn: () => getProductBySupplierQueryFn(supplier),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetProductBySearch = (params: any) =>
  useQuery<ProductType[]>({
    queryKey: [QueryKeysProduct.GET_PRODUCT_SEARCH, params],
    queryFn: () => getProductBySearchQueryFn(params),
    placeholderData: initialProductList,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

export const useQueryGetProductDetail = (slug: string) =>
  useQuery<ProductType>({
    queryKey: [QueryKeysProduct.GET_DETAIL_PRODUCT, slug],
    queryFn: () => getDetailProductQueryFn(slug),
    placeholderData: initialProductDetail,
  });
