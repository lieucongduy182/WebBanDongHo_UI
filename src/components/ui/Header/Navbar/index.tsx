"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { brandService } from "@/services/brand";
import { categoryService } from "@/services/category";
import { supplierService } from "@/services/supplier";

import { ChevronDownNavbar } from "../../../../../public/icons";

export interface NavbarType {
  label: string;
  value: string;
  children?: NavbarType[];
}

export const listNavbar: NavbarType[] = [
  {
    label: "Trang chủ",
    value: "trang-chu",
  },
  {
    label: "Sản Phẩm",
    value: "san-pham",
  },
  {
    label: "Danh mục",
    value: "danh-muc",
  },
  {
    label: "Thương hiệu",
    value: "thuong-hieu",
  },
  {
    label: "Nhà cung cấp",
    value: "nha-cung-cap",
  },
];

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.3,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -30,
    transition: {
      duration: 0.3,
    },
    display: "none",
  },
};

export const Navbar = () => {
  const [updateListNavbar, setUpdateListNavbar] = useState<NavbarType[]>([]);
  const [selectedNavbar, setSelectedNavbar] = useState<string>("");
  const [isHover, toggleHover] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseCategory = await categoryService.getAllCategory();
      const responseBrand = await brandService.getAllBrand();
      const responseSupplier = await supplierService.getAllSupplier();

      const listCategory: NavbarType[] = responseCategory.data.map(
        (item: any) => {
          return {
            label: item.tendm,
            value: item.madm,
          };
        },
      );
      const listBrand: NavbarType[] = responseBrand.data.map((item: any) => {
        return {
          label: item.tenth,
          value: item.math,
        };
      });

      const listSupplier: NavbarType[] = responseSupplier.data.map(
        (item: any) => {
          return {
            label: item.tenncc,
            value: item.mancc,
          };
        },
      );

      const updateNavbar = listNavbar.map((item) => {
        if (item.value === "danh-muc") {
          return {
            ...item,
            children: listCategory,
          };
        }

        if (item.value === "thuong-hieu") {
          return {
            ...item,
            children: listBrand,
          };
        }

        if (item.value === "nha-cung-cap") {
          return {
            ...item,
            children: listSupplier,
          };
        }
        return item;
      });

      setUpdateListNavbar(updateNavbar);
    };

    fetchData();
  }, []);

  const handleAction = (item: NavbarType): string => {
    if (item.value === "trang-chu") {
      return "/";
    }
    if (item.value === "san-pham") {
      return "/products";
    }

    return "#";
  };

  const handleRedirectSubMenu = (
    navbar: NavbarType,
    sub: NavbarType,
  ): string => {
    if (navbar.value === "danh-muc") {
      return `/category/${sub.value}`;
    }

    if (navbar.value === "thuong-hieu") {
      return `/brand/${sub.value}`;
    }

    if (navbar.value === "nha-cung-cap") {
      return `/supplier/${sub.value}`;
    }
    return "/";
  };

  return (
    <div className="w-full bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-0 xl:px-[20px] 2xl:px-[130px] py-4">
        <div className="flex items-center lg:gap-10 xl:gap-24">
          <div className="flex justify-between w-full ">
            {updateListNavbar.map((item) => {
              if (!item.children || item.children.length === 0)
                return (
                  <div
                    key={item.value}
                    className="flex gap-2 h-full cursor-pointer transition-all ease-in duration-200 hover:text-red-600"
                  >
                    <Link href={handleAction(item)}>
                      <p className="text-lg font-bold uppercase">
                        {item.label}
                      </p>
                    </Link>

                    <div className="w-[25px] h-[25px]" />
                  </div>
                );
              return (
                <motion.div
                  key={item.value}
                  className={`group flex h-full cursor-pointer transition-all ease-in duration-200 relative after:content-[''] after:bg-transparent after:w-full after:h-[160%]  after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 ${
                    selectedNavbar === item.value ? "text-primary" : ""
                  }  hover:text-red-600`}
                  onHoverStart={() => {
                    setSelectedNavbar(item.value);
                    toggleHover(true);
                  }}
                  onHoverEnd={() => {
                    setSelectedNavbar("");
                    toggleHover(false);
                  }}
                >
                  <div className={"flex h-full items-center gap-2 relative"}>
                    <p className="text-lg font-bold uppercase">{item.label}</p>

                    <ChevronDownNavbar />
                  </div>

                  <motion.div
                    className="absolute top-10 hidden group-hover:block bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 before:content-[''] before:h-[20px] before:w-[180px] before:bg-transparent before:absolute before:top-[-20px]"
                    initial="exit"
                    animate={
                      isHover && selectedNavbar === item.value
                        ? "enter"
                        : "exit"
                    }
                    variants={subMenuAnimate}
                  >
                    {item.children?.map((sub: NavbarType) => {
                      return (
                        <Link
                          key={sub.value}
                          className={`text-black  hover:bg-gradient-to-r from-neutral-800 to-zinc-800 hover:text-white
                               group flex items-center rounded-tl-md rounded-tr-md text-sm px-6 py-4 w-[180px]`}
                          href={handleRedirectSubMenu(item, sub)}
                        >
                          <p className="text-lg font-medium">{sub.label}</p>
                        </Link>
                      );
                    })}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
