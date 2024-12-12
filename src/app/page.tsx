import { dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import HomePage from "@/components/ui/Page/HomePage";
import {
  getAllProductQueryFn,
  getBestSellerProductQueryFn,
} from "@/query/product/queryFnsProduct";
import { QueryKeysProduct } from "@/query/product/queryKeysProduct";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

export const metadata: Metadata = {
  title: "Trang chủ - Đồng hồ",
  description: "Đồng hồ chính hãng",
};

export default async function Home() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery([QueryKeysProduct.GET_ALL_PRODUCT], () =>
      getAllProductQueryFn(),
    );
    await queryClient.fetchQuery([QueryKeysProduct.GET_BEST_SELLER], () =>
      getBestSellerProductQueryFn(),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <HomePage />
    </ReactQueryHydrate>
  );
}
