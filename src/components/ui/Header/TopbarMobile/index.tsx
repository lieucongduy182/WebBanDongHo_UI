"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchCustom } from "@/components/form/SearchCustom";

import {
  ChevronRightIcon,
  CloseIcon,
  MenuIcon,
} from "../../../../../public/icons";
import { listNavbar, NavbarType } from "../Navbar";
import UserInformation from "../UserInformation";

export const TopbarMobile = () => {
  const pathname = usePathname();

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [showDropdownItems, setShowDropdownItems] = useState<string[]>([]);

  useEffect(() => {
    setIsShowMenu(false);
  }, [pathname]);

  return (
    <div className="w-full block lg:hidden">
      <div className="w-full fixed z-[1024]">
        <div className="w-full h-[auto] lg:h-[116px] bg-[#6e9c92]">
          <div className="h-full px-4 pt-4 lg:pt-15 pb-4">
            <div className="w-full flex items-center justify-between">
              <div
                onClick={() => setIsShowMenu(!isShowMenu)}
                className="cursor-pointer"
              >
                {isShowMenu ? (
                  <CloseIcon className="stroke-white stroke-[2px] h-8 w-8" />
                ) : (
                  <MenuIcon />
                )}
              </div>

              <div className="w-[88px] h-9">
                <Link href={"/"}>
                  <Image
                    src={"/images/logo.png"}
                    quality="100"
                    alt=""
                    height={36}
                    width={88}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <UserInformation />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full fixed h-full overflow-y-auto transition-all duration-500 ${
            isShowMenu ? "left-0" : "left-[-100%]"
          }`}
        >
          <div className="bg-white w-full px-4 pb-10 pt-6">
            <ul>
              {listNavbar.map((item: NavbarType, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    console.log("abc");
                  }}
                  className={`flex flex-col items-center w-full relative z-[1] ${
                    index !== listNavbar.length - 1 &&
                    "pb-5 border-b-[1px] border-[#C8C8C8]"
                  } ${index !== 0 && "pt-5"}`}
                >
                  <div
                    className={`flex items-center justify-between cursor-pointer w-full`}
                  >
                    <p
                      className={`${
                        showDropdownItems.includes(item.value)
                          ? "text-primary"
                          : "text-black"
                      } text-lg font-bold`}
                    >
                      {item.label}
                    </p>
                    {item.children && item.children.length > 0 && (
                      <ChevronRightIcon
                        className={`stroke-[#6e9c92] stroke-[2px] transition-all duration-300 ${
                          showDropdownItems.includes(item.value) &&
                          "rotate-[-90deg]"
                        }`}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-[71px] lg:pt-[116px] bg-[#F5F5FA]">
        <div className="w-full px-4 py-3">
          <SearchCustom height="48px" />
        </div>
      </div>
    </div>
  );
};
