"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { PageWrapper } from "../../PageWrapper";
import { ProductItem } from "../../ProductItem";

export const SearchShopping = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const search = useSearchParams();
  const searchQuery = search.get("query");

  //   const { data: listProducts } = useQueryGetAllProduct({
  //     limit: 12,
  //     page: currentPage,
  //     search: searchQuery,
  //   });

  return (
    <PageWrapper>
      <div className="mt-6 lg:p-12 p-4 bg-white rounded-lg">
        <h2 className="uppercase text-[#080B12] font-bold text-lg lg:text-2xl leading-9 mb-6">
          {/* {listProducts?.data.length === 0
            ? `Không có kết quả nào cho từ khoá: ${searchQuery}`
            : `Kết quả tìm kiếm cho từ khoá: ${searchQuery}`} */}
        </h2>

        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {/* {listProducts &&
            listProducts.data.map((product: ProductType) => (
              <ProductItem
                key={product.id}
                product={[]}
                styleWrapperProduct="w-full"
                heightImage={840}
                widthImage={840}
              />
            ))} */}
        </div>
      </div>
    </PageWrapper>
  );
};
