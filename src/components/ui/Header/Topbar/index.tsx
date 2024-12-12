"use client";

import Image from "next/image";
import Link from "next/link";

import { SearchCustom } from "@/components/form/SearchCustom";

import UserInformation from "../UserInformation";

export const Topbar = () => {
  return (
    <>
      <div className="w-full h-[120px] bg-gradient-to-r from-slate-800 to-gray-800 px-4 lg:px-[60px] xl:px-[72px]">
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full ">
            <Link href={"/"}>
              <Image
                src="/images/logo.png"
                alt=""
                width={203}
                height={84}
                quality="100"
                className="max-w-[150px] max-h-[75px] object-cover"
              />
            </Link>

            <SearchCustom height="12em" />

            <div className="flex items-center gap-12">
              <UserInformation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
