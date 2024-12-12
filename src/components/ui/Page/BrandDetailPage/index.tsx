"use client";

import { useParams } from "next/navigation";

import { useQueryGetBrandDetail } from "@/query/brand/queryHooksBrand";
import { useQueryGetProductByBrand } from "@/query/product/queryHooksProduct";

import { ListProduct } from "../../ListProduct";
import { Loading } from "../../Loading";

export const BrandDetailPage = () => {
  const { math } = useParams();
  const { data: detailBrand } = useQueryGetBrandDetail(math as string);
  const { data: listProductByBrand } = useQueryGetProductByBrand(
    math as string,
  );

  if (!listProductByBrand) {
    return <Loading isCenter height="h-[700px]" />;
  }

  if (listProductByBrand.length === 0) {
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm trong hệ thống
      </div>
    );
  }

  return (
    <ListProduct
      title={`Danh sách sản phẩm thương hiệu ${detailBrand?.tenth || ""}`}
      listProducts={listProductByBrand}
    />
  );
};
