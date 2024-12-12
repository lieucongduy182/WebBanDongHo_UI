"use client";

import { useParams } from "next/navigation";

import { useQueryGetProductBySupplier } from "@/query/product/queryHooksProduct";
import { useQueryGetSupplierDetail } from "@/query/supplier/queryHooksSupplier";

import { ListProduct } from "../../ListProduct";
import { Loading } from "../../Loading";

export const SupplierDetailPage = () => {
  const { mancc } = useParams();
  const { data: detailSupplier } = useQueryGetSupplierDetail(mancc as string);
  const { data: listProductBySupplier } = useQueryGetProductBySupplier(
    mancc as string,
  );

  if (!listProductBySupplier) {
    return <Loading isCenter height="h-[700px]" />;
  }

  if (listProductBySupplier.length === 0) {
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm trong hệ thống
      </div>
    );
  }

  return (
    <ListProduct
      title={`Danh sách sản phẩm thương hiệu ${detailSupplier?.tenncc || ""}`}
      listProducts={listProductBySupplier}
    />
  );
};
