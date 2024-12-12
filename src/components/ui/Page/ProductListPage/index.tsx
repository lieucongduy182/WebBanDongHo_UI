"use client";

import { useQueryGetAllProduct } from "@/query/product/queryHooksProduct";

import { ListProduct } from "../../ListProduct";
import { Loading } from "../../Loading";

export const ProductListPage = () => {
  const { data: listProduct } = useQueryGetAllProduct();

  if (!listProduct) {
    return <Loading isCenter height="h-[700px]" />;
  }

  if (listProduct.length === 0) {
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm trong hệ thống
      </div>
    );
  }

  return (
    <ListProduct
      title="Danh sách tất cả các sản phẩm"
      listProducts={listProduct}
    />
  );
};
