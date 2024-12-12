"use client";

import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { ButtonCustom } from "@/components/form/ButtonCustom";
import { HeaderUser } from "@/components/ui/HeaderUser";
import { Loading } from "@/components/ui/Loading";
import { ModalOrderDetail } from "@/components/ui/Modal/ModalChildren/ModalOrderDetail";
import { ConvertPrice } from "@/helpers/convert";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { useQueryGetListOrder } from "@/query/order/queryHooksOrder";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { OrderType } from "@/types/order";

import { dataTrangthai, textHinhThucThanhThoan } from "./helper";

const initialSelectOrder = {
  diaChi: "",
  email: "",
  ghichu: "",
  giaohang: null,
  hinhThucThanhToan: 0,
  hoTen: "",
  khachhang: {
    diaChi: "",
    email: "",
    gioiTinh: "",
    hoTen: "",
    makh: "",
    sdt: "",
    taikhoan: {
      username: "",
    },
  },
  madh: "",
  ngayDat: "",
  nhanvien: null,
  sdt: "",
  tongTien: 0,
  trangThai: 0,
};

const OrdersPage = () => {
  const { status: loginStatus, data } = useSession();
  const isAuthenticated = handleIsAuthenticated(loginStatus);

  const [selectOrder, setSelectOrder] = useState<OrderType>(initialSelectOrder);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);

  const { data: profile, isFetching } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const { data: listOrder, isFetching: isFetchingOrder } = useQueryGetListOrder(
    profile?.makh || "",
  );

  const handleDetailOrder = (item: OrderType) => {
    setSelectOrder(item);
    setIsOpenModalDetail(true);
  };

  if (isFetching || isFetchingOrder || loginStatus === "loading")
    return <Loading isCenter heightSpinner="h-[1000px]" />;

  return (
    <div className="w-full">
      <div className="p-4 lg:p-6 flex flex-col gap-8">
        <HeaderUser
          title={"Danh sách đơn hàng"}
          subTitle="Thông tin danh sách về các đơn hàng bạn đã đặt"
        />

        <div className="border-b-[1px] border-solid border-gray-10 w-full" />

        <div className="w-full overflow-x-scroll border-[1px] border-solid border-gray-10 rounded-lg p-4">
          <table className="w-[1080px] lg:w-full">
            <thead className="">
              <tr>
                <th className="p-3 text-[#4a5568] text-base font-semibold tracking-wide text-left">
                  Mã đơn hàng
                </th>
                <th className="p-3 text-base text-[#4a5568] font-semibold tracking-wide text-left">
                  Tổng tiền
                </th>
                <th className="p-3 text-base text-[#4a5568] font-semibold tracking-wide text-left">
                  Trạng thái
                </th>
                <th className="p-3 text-base text-[#4a5568] font-semibold tracking-wide text-left">
                  Ngày đặt
                </th>
                <th className="p-3 text-base text-[#4a5568] font-semibold tracking-wide text-left">
                  HTTT
                </th>
                <th className="p-3 text-base text-[#4a5568] font-semibold tracking-wide text-left">
                  Chi tiết đơn hàng
                </th>
              </tr>
            </thead>
            <tbody>
              {listOrder?.map((item, index) => (
                <tr
                  key={`${item.madh}`}
                  className={`${index % 2 === 0 ? "bg-[#edf2f7]" : ""}`}
                >
                  <td className="text-start text-base tracking-wide p-4">
                    {item.madh}
                  </td>
                  <td className="text-start text-base tracking-wide p-4">
                    {ConvertPrice(item.tongTien)}
                  </td>
                  <td className="text-start text-base tracking-wide p-4">
                    <p className={`${dataTrangthai(item.trangThai)?.color}`}>
                      {dataTrangthai(item.trangThai)?.label}
                    </p>
                  </td>
                  <td className="text-start text-base tracking-wide p-4">
                    {moment(item.ngayDat).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-start text-base tracking-wide p-4">
                    {textHinhThucThanhThoan(item.hinhThucThanhToan)}
                  </td>
                  <td className="text-start text-base tracking-wide p-4">
                    <ButtonCustom onClick={() => handleDetailOrder(item)}>
                      Xem chi tiết
                    </ButtonCustom>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectOrder.madh && (
        <ModalOrderDetail
          handleCloseModal={() => {
            setIsOpenModalDetail(false);
            setSelectOrder(initialSelectOrder);
          }}
          isOpenModal={isOpenModalDetail}
          selectOrder={selectOrder}
        />
      )}
    </div>
  );
};

export default OrdersPage;
