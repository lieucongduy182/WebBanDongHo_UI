"use client";

import { motion } from "framer-motion";
import _some from "lodash/some";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { listDataSidebarUser, SidebarType } from "@/constant/sidebar";
import { handleIsAuthenticated } from "@/helpers/handleIsAuthenticated";
import { useQueryGetProfile } from "@/query/profile/queryFnsProfile";

import { Loading } from "../Loading";

export const SideBarAccount = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { status: loginStatus, data } = useSession();
  const isAuthenticated = handleIsAuthenticated(loginStatus);
  const { data: profile, isFetching: isProfileFetching } = useQueryGetProfile(
    (data?.user.name as string) || "",
    isAuthenticated,
  );

  const [isShowDropdownAccount, setIsShowDropdownAccount] =
    useState<boolean>(false);
  const [selectedItemSidebar, setSelectedItemSidebar] = useState<string>("");

  useEffect(() => {
    _some(listDataSidebarUser, (itemSidebar: SidebarType) => {
      if (!itemSidebar.listDropdown) {
        if (pathname.includes(itemSidebar.id)) {
          setSelectedItemSidebar(itemSidebar.id);
          return true;
        }
      }

      _some(itemSidebar.listDropdown, (dropdown: { id: string }) => {
        if (pathname.includes(dropdown.id)) {
          setSelectedItemSidebar(dropdown.id);
          setIsShowDropdownAccount(true);
          return true;
        }
      });

      return false;
    });
  }, []);

  return (
    <div className="w-full lg:w-[360px] h-full bg-white rounded-lg flex-shrink-0">
      <div className="p-4 lg:p-6 border-[1px] border-solid border-gray-10 border-opacity-50">
        {isProfileFetching || loginStatus === "loading" ? (
          <Loading heightSpinner={"h-[100px]"} isCenter />
        ) : (
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] cursor-pointer relative">
              <Image
                src={"/images/avatar.png"}
                alt=""
                fill
                className="border-[1px] border-white border-solid rounded-full object-cover object-center"
              />
            </div>

            <div className="flex justify-center items-center">
              <p className="font-bold text-xl">{profile?.hoTen}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 lg:p-6">
        <div className="flex gap-6 flex-col">
          {listDataSidebarUser.map((itemSidebar: SidebarType) => {
            return (
              <div
                className={`flex flex-col cursor-pointer`}
                key={itemSidebar.id}
                onClick={() => {
                  if (itemSidebar.id === "account") {
                    setIsShowDropdownAccount(!isShowDropdownAccount);
                    return;
                  }
                  setSelectedItemSidebar(itemSidebar.id);
                  router.push(`/account/${itemSidebar.id}`);
                }}
              >
                <div className="flex items-center gap-2">
                  {selectedItemSidebar.includes(itemSidebar.id)
                    ? itemSidebar.iconSelected
                    : itemSidebar.icon}

                  <p
                    className={`text-md pt-[2px] ${
                      selectedItemSidebar.includes(itemSidebar.id)
                        ? "text-primary font-bold"
                        : "text-black font-medium "
                    }`}
                  >
                    {itemSidebar.title}
                  </p>
                </div>

                {itemSidebar.listDropdown && (
                  <motion.div
                    className="h-0 overflow-hidden w-full px-8"
                    animate={
                      isShowDropdownAccount
                        ? {
                            height: "fit-content",
                          }
                        : {
                            height: 0,
                          }
                    }
                  >
                    {itemSidebar.listDropdown?.map(
                      (itemDropdown: {
                        title: string;
                        id: string;
                        link?: string;
                      }) => (
                        <div
                          key={itemDropdown.id}
                          className="cursor-pointer pt-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItemSidebar(itemDropdown.id);
                            router.push(itemDropdown.link || "");
                          }}
                        >
                          <p
                            className={` text-medium ${
                              selectedItemSidebar.includes(itemDropdown.id)
                                ? "text-primary font-bold"
                                : "text-black font-normal"
                            }`}
                          >
                            {itemDropdown.title}
                          </p>
                        </div>
                      ),
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
