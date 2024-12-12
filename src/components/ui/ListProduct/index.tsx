import { PageWrapper } from "../PageWrapper";
import { ProductItem } from "../ProductItem";

interface Props {
  title: string;
  listProducts: any[];
}

export const ListProduct = (props: Props) => {
  const { listProducts, title } = props;
  return (
    <PageWrapper>
      <div className="mt-6 lg:p-12 p-4 bg-white rounded-lg">
        <h2 className="uppercase text-[#080B12] font-bold text-lg lg:text-2xl leading-9 mb-6">
          {title}
        </h2>

        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {listProducts.slice(0, 20).map((product) => (
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
