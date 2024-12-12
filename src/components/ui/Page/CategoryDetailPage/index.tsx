"use client";

import { useParams } from "next/navigation";

import { useQueryGetCategoryDetail } from "@/query/category/queryHooksCategory";
import { useQueryGetProductByCategory } from "@/query/product/queryHooksProduct";

import { ListProduct } from "../../ListProduct";
import { Loading } from "../../Loading";

export const CategoryDetailPage = () => {
  const { madm } = useParams();
  const { data: detailCategory } = useQueryGetCategoryDetail(madm as string);
  const { data: listProductCategory } = useQueryGetProductByCategory(
    madm as string,
  );

  if (!listProductCategory) {
    return <Loading isCenter height="h-[700px]" />;
  }

  if (listProductCategory.length === 0) {
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm trong hệ thống
      </div>
    );
  }

  return (
    <ListProduct
      title={`Danh sách sản phẩm thương hiệu ${detailCategory?.tendm || ""}`}
      listProducts={listProductCategory}
    />
  );
};
