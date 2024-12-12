import Link from "next/link";

import { ImageCustom } from "@/components/ui/ImageCustom";
import { ConvertPrice } from "@/helpers/convert";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { useMutationAddCart } from "@/mutate/cart/hook";
import { QueryKeysCart } from "@/query/cart/queryKeysCart";
import { cartService } from "@/services/cart";
import { CartType } from "@/types/cart";
import { queryClient } from "@/utils/react-query/react-query-provider";

import { CheckedBoxIcon, TrashIcon } from "../../../../../../public/icons";
import { Checkbox, returnIdCart } from ".";
import { CountQuantityProduct } from "./CountQuantityProduct";

interface Props {
  item: CartType;
  listChecked: string[];
  // eslint-disable-next-line no-unused-vars
  handleCheckedItem: (item: CartType) => void;
}

const styleTextItem = "font-medium text-base text-[#242424]";

export const ItemProductCheckout = (props: Props) => {
  const { handleCheckedItem, item, listChecked } = props;

  const { mutate } = useMutationAddCart();

  const handleIncrease = () => {
    if (item.soluong >= item.sanpham.soluong) return;
    mutate({
      makh: item.id.makh,
      masp: item.id.masp,
      soluong: 1,
    });
  };
  const handleDecrease = () => {
    if (item.soluong === 1) return;
    mutate({
      makh: item.id.makh,
      masp: item.id.masp,
      soluong: -1,
    });
  };

  const handleRemoveItem = async () => {
    try {
      await cartService.deleteCartItemUser(item.id.makh, item.id.masp);
      queryClient.invalidateQueries([QueryKeysCart.GET_ALL_CART_USER]);
      openToastSuccess("Đã xoá sản phẩm thành công!");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại sau !!");
    }
  };

  return (
    <div
      className="flex lg:flex-row flex-col lg:items-center gap-2 lg:gap-12"
      key={`${item.id.makh}-${item.id.masp}`}
    >
      <div className="w-full lg:w-[46.75%] flex gap-2 items-center">
        <div
          className={`${
            item.sanpham.soluong > 0 ? "cursor-pointer" : "cursor-not-allowed"
          } `}
          onClick={() => handleCheckedItem(item)}
        >
          {listChecked.includes(returnIdCart(item)) ? (
            <CheckedBoxIcon />
          ) : (
            <Checkbox />
          )}
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="min-w-[70px] h-full">
            <Link href={`/products/${item.sanpham.slug}`}>
              <ImageCustom
                height={70}
                width={70}
                alt={item.sanpham.tensp}
                src={item.sanpham.image}
                className="h-auto w-[70px] aspect-square rounded-lg object-cover object-center"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1">
              <Link href={`/products/${item.sanpham.slug}`}>
                <p
                  className={`line-clamp-2 ${styleTextItem} ${
                    item.sanpham.soluong > 0 ? "" : "line-through"
                  }`}
                >
                  {item.sanpham.tensp}
                </p>
              </Link>

              {item.sanpham.soluong === 0 && (
                <p className="font-medium text-base text-red-60">
                  Sản phẩm hết hàng
                </p>
              )}
            </div>

            <div className="block lg:hidden">
              <div className="flex justify-between items-center">
                <p className={`${styleTextItem}`}>
                  {ConvertPrice(item.sanpham.dongia || 0)}
                </p>

                <div className="lg:hidden block">
                  <CountQuantityProduct
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                    item={item}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-[10%] lg:block hidden gap-2 ${styleTextItem}`}>
        {ConvertPrice(item.sanpham.dongia)}
      </div>

      <div className="w-[10%] lg:block hidden">
        <CountQuantityProduct
          item={item}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      </div>

      <div
        className={`${styleTextItem} text-red-600 w-[12%] lg:px-0 px-[26px]  whitespace-nowrap`}
      >
        {ConvertPrice(item.sanpham.dongia * item.soluong)}
      </div>

      <div className="lg:block hidden" onClick={handleRemoveItem}>
        <div className="flex flex-1 cursor-pointer">
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};
