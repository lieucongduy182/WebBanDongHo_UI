"use client";

import { useSearchParams } from "next/navigation";

import { ListProduct } from "@/components/ui/ListProduct";
import { Loading } from "@/components/ui/Loading";
import { useQueryGetProductBySearch } from "@/query/product/queryHooksProduct";

export default function SearchProducts() {
  const search = useSearchParams();
  const searchQuery = search.get("query");

  const { data: listProductSearch, isFetching } = useQueryGetProductBySearch({
    query: searchQuery,
  });

  if (!listProductSearch || isFetching) {
    return <Loading isCenter height="h-[700px]" />;
  }

  if (listProductSearch.length === 0) {
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm trong hệ thống
      </div>
    );
  }
  return (
    <div className="w-full h-full pt-4 lg:pt-[235px] bg-gray-10">
      <ListProduct
        title={`Các sản phẩm theo từ khoá: ${searchQuery}`}
        listProducts={listProductSearch}
      />
    </div>
  );
}
