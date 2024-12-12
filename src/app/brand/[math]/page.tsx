import { dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { BrandDetailPage } from "@/components/ui/Page/BrandDetailPage";
import { getDetailBrandQueryFn } from "@/query/brand/queryFnsBrand";
import { QueryKeysBrand } from "@/query/brand/queryKeysBrand";
import { getProductByBrandQueryFn } from "@/query/product/queryFnsProduct";
import { QueryKeysProduct } from "@/query/product/queryKeysProduct";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

interface Props {
  params: { math: string };
}

export default async function Brand(props: Props) {
  const { params } = props;

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      [QueryKeysBrand.GET_DETAIL_BRAND, params.math],
      () => getDetailBrandQueryFn(params.math),
    );

    await queryClient.fetchQuery(
      [QueryKeysProduct.GET_PRODUCT_BRAND, params.math],
      () => getProductByBrandQueryFn(params.math),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full h-full pt-4 lg:pt-[235px] bg-gray-10">
      <ReactQueryHydrate state={dehydratedState}>
        <BrandDetailPage />
      </ReactQueryHydrate>
    </div>
  );
}
