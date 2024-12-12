"use client";

import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";

import { DropdownCustom } from "@/components/form/DropDownCustom";
import { AppContext } from "@/contexts/app.contexts";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { handleOpenModal } from "@/helpers/handleModal";
import { useQueryGetAllCartUser } from "@/query/cart/queryHooksCart";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";
import { OptionSelect } from "@/types/select";

import {
  ChevronDownIcon,
  UserAuthIcon,
  UserIcon,
} from "../../../../../public/icons";
import { Loading } from "../../Loading";
import CartIcon from "../CartIcon";

export const listMenuAuth: OptionSelect[] = [
  {
    label: "Thông tin của tôi",
    value: "profile",
  },
  {
    label: "Đăng xuất",
    value: "signout",
  },
];

const UserInformation = () => {
  const { state, dispatch } = useContext(AppContext);
  const { status: loginStatus, data } = useSession();

  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );
  const { data: cart } = useQueryGetAllCartUser(profile?.makh || "");

  const router = useRouter();

  if (loginStatus === "loading") return <Loading isCenter width="w-[56px]" />;

  if (isAuthenticated)
    return (
      <>
        {/* <div className="relative lg:block hidden">
          <BellIcon
            className="cursor-pointer "
            onClick={() => {
              router.push("/account/notification");
            }}
          />
        </div> */}

        <Link href={"/cart"} className="lg:block hidden">
          <div className="flex items-center cursor-pointer">
            <CartIcon quantity={cart?.length || 0} />
          </div>
        </Link>
        <div className="flex justify-start items-center cursor-pointer">
          <DropdownCustom
            LabelComponent={() => (
              <div className={"flex h-full items-center gap-2"}>
                {/* {profile?.avatar ? ( */}

                <UserAuthIcon />

                <ChevronDownIcon fill="white" className="md:block hidden" />
              </div>
            )}
            listOptions={listMenuAuth}
            onClickItemMenu={(option: OptionSelect) => {
              if (option.value === "signout") {
                signOut();
                deleteCookie("username");
              }

              if (option.value === "profile") {
                router.push("/account/account-profile");
              }
            }}
            isCheckIcon={false}
            styleMenuItem="px-6 py-4 w-[210px]"
            styleOptionLabel="text-sm font-normal"
          />
        </div>
      </>
    );

  return (
    <>
      <button
        className="flex justify-start items-center cursor-pointer"
        onClick={() => handleOpenModal(state, dispatch, "Signin")}
      >
        <UserIcon />
        <span className="ml-4 text-white lg:text-lg text-md font-medium lg:block hidden">
          Đăng nhập
        </span>
      </button>
      <div
        onClick={() => {
          handleOpenModal(state, dispatch, "Signin");
        }}
        className="lg:block hidden"
      >
        <div className="flex items-center cursor-pointer">
          <CartIcon quantity={cart?.length || 0} />
        </div>
      </div>
    </>
  );
};

export default UserInformation;
