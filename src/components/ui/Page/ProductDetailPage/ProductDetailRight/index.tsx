"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import Divider from "@/components/ui/Divider";
import { AppContext } from "@/contexts/app.contexts";
import { ConvertPrice } from "@/helpers/convert";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { handleOpenModal } from "@/helpers/handleModal";
import { openToastSuccess } from "@/helpers/toast";
import { useMutationAddCart } from "@/mutate/cart/hook";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { ProductType } from "@/types/product";

import { CartIcon } from "../../../../../../public/icons";
import Counter from "./Counter";

interface Props {
  dataProductDetail: ProductType;
}

export const ProductDetailRight = (props: Props) => {
  const { dataProductDetail } = props;

  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { status: loginStatus, data } = useSession();

  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const [quantity, setQuantity] = useState<number>(1);

  const { mutate } = useMutationAddCart();

  const handleStock = () => {
    if (!dataProductDetail.soluong) return 0;
    return dataProductDetail.soluong;
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      handleOpenModal(state, dispatch, "Signin");
      return;
    }
    handleAddCart();
    router.push("/cart");
  };

  const handleAddCart = () => {
    if (!isAuthenticated) {
      handleOpenModal(state, dispatch, "Signin");
      return;
    }
    mutate({
      makh: profile?.makh || "",
      masp: dataProductDetail.masp,
      soluong: quantity,
    });
    openToastSuccess("Thêm sản phẩm vào giỏ hàng thành công!");
  };

  const handleShowButtonPayment = () => {
    if (handleStock() === 0) {
      return (
        <div className="flex justify-center items-center text-xl font-medium text-red-60 text-center">
          Sản phẩm hết hàng, vui lòng liên hệ cửa hàng để được hỗ trợ và tư vấn
        </div>
      );
    }

    return (
      <>
        <ButtonCustom variant="contained" size="large" onClick={handleBuy}>
          <p className="text-md">Mua ngay</p>
        </ButtonCustom>

        <div className="flex items-center gap-4">
          <ButtonCustom
            variant="outlined"
            size="large"
            className="flex items-center gap-2 justify-center whitespace-nowrap !md:px-6 !px-4 !md:py-4 !py-2 md:text-md !text-xs "
            onClick={handleAddCart}
          >
            <div>
              <CartIcon />
            </div>

            <p className="text-md text-slate-900">Thêm vào giỏ hàng</p>
          </ButtonCustom>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={"w-full flex flex-col xl:gap-6 gap-4"}>
        <h1 className="font-bold xl:text-3xl text-xl xl:leading-[42px]">
          {dataProductDetail.tensp}
        </h1>

        <Divider className="!my-0 md:block hidden" />

        <div className="flex gap-6 items-center">
          <h2 className="text-slate-900 font-bold xl:text-4xl text-2xl leading-12">
            {ConvertPrice(dataProductDetail.dongia)}
          </h2>
        </div>

        <div>
          Mã sản phẩm:{" "}
          <span className="font-medium">{dataProductDetail.masp}</span>
        </div>

        <div>
          Thương hiệu: &nbsp;
          <Link href={`#`}>
            <span className="font-medium hover:underline">
              {dataProductDetail.thuonghieu.tenth}
            </span>
          </Link>
        </div>

        <div>
          Nhà cung cấp: &nbsp;
          <Link href={`#`}>
            <span className="font-medium hover:underline">
              {dataProductDetail.nhacungcap.tenncc}
            </span>
          </Link>
        </div>

        <div>
          Danh mục: &nbsp;
          <Link href={`#`}>
            <span className="font-medium hover:underline">
              {dataProductDetail.danhmuc.tendm}
            </span>
          </Link>
        </div>

        <div>
          Chi tiết: &nbsp;
          <Link href={`#`}>
            <span className="font-medium hover:underline">
              {dataProductDetail.chitietSP}
            </span>
          </Link>
        </div>

        <div>
          Còn
          <span className="font-medium"> {dataProductDetail.soluong} </span>
          Sản phẩm
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-medium">Số lượng</div>
          <Counter
            setQuantity={setQuantity}
            quantity={quantity}
            stock={handleStock()}
          />
        </div>

        {handleShowButtonPayment()}
      </div>
    </>
  );
};
