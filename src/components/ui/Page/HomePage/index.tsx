"use client";

import {
  useQueryGetAllProduct,
  useQueryGetBestSellerProduct,
} from "@/query/product/queryHooksProduct";
import { ProductType } from "@/types/product";

import { BannerHome } from "./Banner";
import { SectionProduct } from "./SectionProduct";

const HomePage = () => {
  const { data: listProduct } = useQueryGetAllProduct();
  const { data: listBestSellerProduct } = useQueryGetBestSellerProduct();

  return (
    <>
      <div className="w-full h-full pt-4 lg:pt-[175px]  bg-gray-10">
        <BannerHome />
      </div>

      <div className="w-full h-full pt-4 lg:pt-20">
        <SectionProduct
          products={listProduct as ProductType[]}
          title="Sản phẩm mới"
        />
      </div>

      <div className="w-full h-full pt-4 lg:pt-20">
        <SectionProduct
          products={listBestSellerProduct as ProductType[]}
          title="Sản phẩm bán chạy nhất"
        />
      </div>
      <div className="w-full h-full pt-4 lg:pt-20">
        <SectionProduct
          products={listProduct as ProductType[]}
          title="Sản phẩm khuyến mãi"
        />
      </div>
    </>
  );
};

export default HomePage;
