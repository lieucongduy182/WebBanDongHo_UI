"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

import Divider from "@/components/ui/Divider";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { QueryKeysCart } from "@/query/cart/queryKeysCart";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { cartService } from "@/services/cart";
import { CartType } from "@/types/cart";
import { queryClient } from "@/utils/react-query/react-query-provider";

import { TrashIcon } from "../../../../../../public/icons";
import { ItemProductCheckout } from "./ItemProductCheckout";

interface Props {
  cart: CartType[];
  listChecked: string[];
  setListChecked: Dispatch<SetStateAction<string[]>>;
}

const styleTextHead = "font-medium text-md text-[#242424] lg:block hidden";

export const returnIdCart = (item: CartType): string => {
  return `${item.id.makh}-${item.id.masp}`;
};

export const CartLeft = (props: Props) => {
  const { cart, listChecked, setListChecked } = props;

  const { status: loginStatus, data } = useSession();

  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const handleRemoveAll = async () => {
    try {
      await cartService.deleteAllCartUser(profile?.makh || "");
      queryClient.invalidateQueries([QueryKeysCart.GET_ALL_CART_USER]);
      openToastSuccess("Đã xoá hết sản phẩm trong giỏ hàng");
    } catch (error) {
      openToastError("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  const handleCheckedItem = (item: CartType) => {
    if (item.sanpham.soluong <= 0) return;

    const findItemChecked = listChecked.find(
      (checked) => checked === returnIdCart(item),
    );

    if (findItemChecked) {
      const removeChecked = listChecked.filter(
        (checked) => checked !== returnIdCart(item),
      );

      setListChecked(removeChecked);
      return;
    }

    setListChecked([...listChecked, returnIdCart(item)]);
  };
  return (
    <div className="w-full lg:w-[72.5%] h-full flex flex-col gap-[10px]">
      <div className="bg-white w-full h-full rounded-[4px]">
        <div className="px-4 py-3 flex items-center gap-12">
          <div className="w-full lg:w-[46.75%] flex gap-2 items-center">
            <div className="cursor-pointer" onClick={() => console.log("abcc")}>
              {/* {listChecked.length === totalItems && checked.length !== 0 ? (
                <CheckedBoxIcon />
              ) : (
                <Checkbox />
              )} */}
            </div>

            <p className={"font-medium text-md text-[#242424]"}>
              Tất cả ({cart.length} sản phẩm)
            </p>
          </div>

          <div className={`w-[10%] ${styleTextHead}`}>Đơn giá</div>

          <div className={`w-[10%] ${styleTextHead}`}>Số lượng</div>

          <div className={`w-[12%] ${styleTextHead}`}>Thành tiền</div>

          <div
            className="flex flex-1 cursor-pointer"
            onClick={() => {
              handleRemoveAll();
            }}
          >
            <TrashIcon />
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-full rounded-[4px]">
        <div className="px-4">
          {cart.map((item: CartType, index: number) => (
            <div
              key={`${item.id.makh}-${item.id.masp}`}
              className="flex flex-col gap-4 my-3"
            >
              <ItemProductCheckout
                item={item}
                listChecked={listChecked}
                handleCheckedItem={handleCheckedItem}
              />
              {index !== cart.length - 1 ? (
                <Divider className="!my-0" />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Checkbox = ({ isSlot }: { isSlot?: boolean }) => {
  return (
    <div
      className={`border-[1.5px] border-solid rounded-[3px] w-[18px] h-[18px] ${isSlot ? "border-black" : ""}`}
    />
  );
};
