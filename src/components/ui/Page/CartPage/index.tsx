"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Loading } from "@/components/ui/Loading";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { openToastError, openToastSuccess } from "@/helpers/toast";
import { useQueryGetAllCartUser } from "@/query/cart/queryHooksCart";
import { QueryKeysCart } from "@/query/cart/queryKeysCart";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { orderService } from "@/services/order";
import { ProductOrderType } from "@/types/order";
import { ShippingType } from "@/types/profile";
import { queryClient } from "@/utils/react-query/react-query-provider";

import { PageWrapper } from "../../PageWrapper";
import { CartLeft, returnIdCart } from "./CartLeft";
import { CartRight } from "./CartRight";

const CartPage = () => {
  const { status: loginStatus, data } = useSession();

  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const [listChecked, setListChecked] = useState<string[]>([]);
  const [shipping, setShipping] = useState<ShippingType>({
    diaChi: "",
    email: "",
    hoTen: "",
    sdt: "",
  });
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const { data: cart } = useQueryGetAllCartUser(profile?.makh || "");

  useEffect(() => {
    if (!profile) return;
    if (profile.makh === "") return;

    setShipping({ ...profile });
  }, [profile]);

  const finalPrice = () => {
    if (!cart) return 0;
    const listData = cart.filter((item) => {
      const findChecked = listChecked.find(
        (checked) => checked === returnIdCart(item),
      );
      if (findChecked) return true;
      return false;
    });
    return listData.reduce(
      (acc, el) => acc + el.soluong * el.sanpham.dongia,
      0,
    );
  };

  const handleSubmitOrder = async () => {
    if (listChecked.length === 0) {
      openToastError("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }

    if (!cart) return;

    const listData = cart.filter((item) => {
      const findChecked = listChecked.find(
        (checked) => checked === returnIdCart(item),
      );

      if (findChecked) return true;

      return false;
    });

    const listOrder: ProductOrderType[] = listData.map((item) => {
      return {
        dongia: item.sanpham.dongia,
        masp: item.sanpham.masp,
        soluong: item.soluong,
      };
    });

    try {
      setIsLoadingButton(true);
      await orderService.addOrder({
        hinhThucThanhToan: 1,
        ghichu: "abc",
        dsSanPham: listOrder,
        makh: profile?.makh || "",
        diaChi: shipping.diaChi,
        email: shipping.email,
        hoTen: shipping.hoTen,
        sdt: shipping.sdt,
      });

      queryClient.invalidateQueries([QueryKeysCart.GET_ALL_CART_USER]);
      setIsLoadingButton(false);
      openToastSuccess("Order đơn hàng thành công!");
    } catch (error) {
      openToastError("Order đơn hàng thất bại, vui lòng thử lại sau!");
    }
  };

  const handleApproveOrderPaypal = async () => {
    if (listChecked.length === 0) {
      openToastError("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }

    if (!cart) return;

    const listData = cart.filter((item) => {
      const findChecked = listChecked.find(
        (checked) => checked === returnIdCart(item),
      );

      if (findChecked) return true;

      return false;
    });

    const listOrder: ProductOrderType[] = listData.map((item) => {
      return {
        dongia: item.sanpham.dongia,
        masp: item.sanpham.masp,
        soluong: item.soluong,
      };
    });

    try {
      setIsLoadingButton(true);
      await orderService.addOrder({
        hinhThucThanhToan: 2,
        ghichu: "abc",
        dsSanPham: listOrder,
        makh: profile?.makh || "",
        diaChi: shipping.diaChi,
        email: shipping.email,
        hoTen: shipping.hoTen,
        sdt: shipping.sdt,
      });

      queryClient.invalidateQueries([QueryKeysCart.GET_ALL_CART_USER]);
      setIsLoadingButton(false);
      openToastSuccess("Order đơn hàng thành công!");
    } catch (error) {
      openToastError("Order đơn hàng thất bại, vui lòng thử lại sau!");
    }
  };

  if (!cart) return <Loading isCenter height="h-[700px]" />;

  if (cart.length === 0)
    return (
      <div className="h-[700px] w-full flex justify-center items-center text-lg lg:text-2xl">
        Chưa có sản phẩm nào trong giỏ hàng
      </div>
    );

  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_APP_PAYPAL || "" }}
    >
      <PageWrapper style="pt-10 pb-20">
        <div className="flex lg:flex-row flex-col gap-10">
          <CartLeft
            cart={cart}
            listChecked={listChecked}
            setListChecked={setListChecked}
          />
          <CartRight
            shipping={shipping}
            setShipping={setShipping}
            finalPrice={finalPrice}
            handleSubmitOrder={handleSubmitOrder}
            isLoadingButton={isLoadingButton}
            handleApproveOrderPaypal={handleApproveOrderPaypal}
          />
        </div>
      </PageWrapper>
    </PayPalScriptProvider>
  );
};

export default CartPage;
