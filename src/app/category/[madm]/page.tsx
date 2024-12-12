import { dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { CategoryDetailPage } from "@/components/ui/Page/CategoryDetailPage";
import { getDetailCategoryQueryFn } from "@/query/category/queryFnsCategory";
import { QueryKeysCategory } from "@/query/category/queryKeysCategory";
import { getProductByCategoryQueryFn } from "@/query/product/queryFnsProduct";
import { QueryKeysProduct } from "@/query/product/queryKeysProduct";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

interface Props {
  params: { madm: string };
}

export default async function Category(props: Props) {
  const { params } = props;

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      [QueryKeysCategory.GET_DETAIL_CATEGORY, params.madm],
      () => getDetailCategoryQueryFn(params.madm),
    );

    await queryClient.fetchQuery(
      [QueryKeysProduct.GET_PRODUCT_CATEGORY, params.madm],
      () => getProductByCategoryQueryFn(params.madm),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full h-full pt-4 lg:pt-[235px] bg-gray-10">
      <ReactQueryHydrate state={dehydratedState}>
        <CategoryDetailPage />
      </ReactQueryHydrate>
    </div>
  );
}
