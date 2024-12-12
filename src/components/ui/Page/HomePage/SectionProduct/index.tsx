"use client";

import { ProductType } from "@/types/product";

import { PageWrapper } from "../../../PageWrapper";
import { ProductItem } from "../../../ProductItem";

interface Props {
  products: ProductType[];
  title: string;
}

export const SectionProduct = (props: Props) => {
  const { products, title } = props;

  return (
    <PageWrapper backgroundColor="bg-white">
      <div className="p-12 lg:p-12 flex flex-col justify-center lg:gap-10 gap-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700">
        <h1 className="text-center text-white">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 lg:px-0 px-4">
          {products.slice(0, 20).map((product) => (
            <ProductItem
              key={product.masp}
              product={product}
              styleWrapperProduct="w-full"
              heightImage={840}
              widthImage={840}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};
