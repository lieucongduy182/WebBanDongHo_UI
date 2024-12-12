import { dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/ui/Page/ProductDetailPage";
import { getDetailProductQueryFn } from "@/query/product/queryFnsProduct";
import { QueryKeysProduct } from "@/query/product/queryKeysProduct";
import getQueryClient from "@/utils/react-query/getQueryClient";
import ReactQueryHydrate from "@/utils/react-query/hydrate.client";

interface Props {
  params: { slug: string };
}

const Page = async (props: Props) => {
  const { params } = props;

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(
      [QueryKeysProduct.GET_DETAIL_PRODUCT, params.slug],
      () => getDetailProductQueryFn(params.slug),
    );
  } catch (error) {
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full h-full lg:pt-[235px] bg-gray-10">
      <ReactQueryHydrate state={dehydratedState}>
        <ProductDetail />
      </ReactQueryHydrate>
    </div>
  );
};

export default Page;
