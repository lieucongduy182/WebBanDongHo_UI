import { dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { SupplierDetailPage } from "@/components/ui/Page/SupplierDetailPage";
import { getProductBySupplierQueryFn } from "@/query/product/queryFnsProduct";
import { getDetailSupplierQueryFn } from "@/query/supplier/queryFnsSupplier";
import { QueryKeysSupplier } from "@/query/supplier/queryKeysSupplier";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

interface Props {
  params: { mancc: string };
}

export default async function Brand(props: Props) {
  const { params } = props;

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      [QueryKeysSupplier.GET_DETAIL_SUPPLIER, params.mancc],
      () => getDetailSupplierQueryFn(params.mancc),
    );

    await queryClient.fetchQuery(
      [QueryKeysSupplier.GET_DETAIL_SUPPLIER, params.mancc],
      () => getProductBySupplierQueryFn(params.mancc),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="w-full h-full pt-4 lg:pt-[235px] bg-gray-10">
      <ReactQueryHydrate state={dehydratedState}>
        <SupplierDetailPage />
      </ReactQueryHydrate>
    </div>
  );
}
