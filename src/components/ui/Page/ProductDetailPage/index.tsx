"use client";

import { useParams } from "next/navigation";

import { useQueryGetProductDetail } from "@/query/product/queryHooksProduct";

import { Loading } from "../../Loading";
import { PageWrapper } from "../../PageWrapper";
import { ProductDetailLeft } from "./ProductDetailLeft";
import { ProductDetailRight } from "./ProductDetailRight";

const ProductDetail = () => {
  const { slug } = useParams();

  const { data: dataProductDetail } = useQueryGetProductDetail(slug as string);

  if (!dataProductDetail) return <Loading height="h-[700px]" />;
  return (
    // <ShoppingContextProvider>
    <div>
      <PageWrapper style="py-10 bg-white overflow-hidden">
        <div className="flex justify-between lg:flex-nowrap flex-wrap gap-12 lg:px-0 px-4">
          <ProductDetailLeft dataProductDetail={dataProductDetail} />
          <div className="lg:block hidden xl:w-[592px] max-w-[35%] ">
            <ProductDetailRight dataProductDetail={dataProductDetail} />
          </div>
        </div>
      </PageWrapper>
    </div>
    // </ShoppingContextProvider>
  );
};

export default ProductDetail;
