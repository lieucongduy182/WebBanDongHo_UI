import { dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { ProductListPage } from "@/components/ui/Page/ProductListPage";
import { getAllProductQueryFn } from "@/query/product/queryFnsProduct";
import { QueryKeysProduct } from "@/query/product/queryKeysProduct";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

export default async function Products() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery([QueryKeysProduct.GET_ALL_PRODUCT], () =>
      getAllProductQueryFn(),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full pt-4 lg:pt-[235px] bg-gray-10">
      <ReactQueryHydrate state={dehydratedState}>
        <ProductListPage />
      </ReactQueryHydrate>
    </div>
  );
}
