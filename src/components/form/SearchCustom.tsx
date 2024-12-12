"use client";

import { Combobox } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { listDropDownSearch, SearchValueType } from "@/constant/header";
import { OptionSelect } from "@/types/select";

import { SearchIcon } from "../../../public/icons";
import CartIcon from "../ui/Header/CartIcon";
import { DropdownCustom } from "./DropDownCustom";

interface Props {
  height: string;
}

const handleWidthDropdown = (value: string) => {
  if (value === SearchValueType.DanhMuc) return "w-[134px]";

  if (value === SearchValueType.NhaCungCap) return "w-[155px]";

  if (value === SearchValueType.ThuongHieu) return "w-[153px]";

  return "w-[129px]";
};

interface SearchForm {
  search: string;
}

export const SearchCustom = (props: Props) => {
  const [selectedSearch, setSelectedSearch] = useState<OptionSelect>(
    listDropDownSearch[0],
  );

  const { height } = props;

  //   const { status: loginStatus } = useSession();
  //   const isAuthenticated = handleIsAuthenticated(loginStatus);
  //   const { data: profile } = useQueryProfile(isAuthenticated);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue: setValueForm,
  } = useForm<SearchForm>({
    defaultValues: {
      search: "",
    },
  });

  const [value, setValue] = useState<string>("");

  const handleRedirect = (search: string) => {
    switch (selectedSearch.value) {
      case SearchValueType.SanPham:
        router.push(`/products/search${search ? `?query=${search}` : ""}`);

        break;
        // case SearchValueType.DanhMuc:
        //   router.push(
        //     `/category/search?${
        //       search ? `search=${toLowerCaseNonAccentVietnamese(search)}` : ""
        //     }`,
        //   );

        //   break;
        // case SearchValueType.ThuongHieu:
        //   router.push(
        //     `/brand/search?${
        //       search ? `search=${toLowerCaseNonAccentVietnamese(search)}` : ""
        //     }`,
        //   );

        //   break;
        // case SearchValueType.NhaCungCap:
        //   router.push(
        //     `/supplier/search${
        //       search ? `?query=${toLowerCaseNonAccentVietnamese(search)}` : ""
        //     }`,
        //   );

        break;
      default:
        break;
    }
  };

  const onSubmit = (data: SearchForm) => {
    if (!data.search.trim()) return;
    setValue(data.search);
    handleRedirect(data.search);
  };

  return (
    <>
      <div
        className={`lg:w-[50%] w-full h-[${height}] flex items-center gap-4`}
      >
        <div className="rounded bg-white border-[1px] border-solid border-[#F5F5FA] h-full w-full py-3 px-4">
          <div className="flex items-center">
            <DropdownCustom
              LabelComponent={() => (
                <div className="flex h-full items-center">
                  <p className="mr-2 lg:mr-4 text-md font-medium">
                    {selectedSearch.label}
                  </p>
                  {/* <ChevronDownBoldIcon className={"h-[24px]"} /> */}
                </div>
              )}
              selected={selectedSearch}
              listOptions={listDropDownSearch}
              onClickItemMenu={(option: OptionSelect) => {
                setSelectedSearch(option);
              }}
              styleMenu="pr-4 border-[#A6A6B0] border-r-[1px]"
              styleMenuItems={`${handleWidthDropdown(
                selectedSearch.value as string,
              )}`}
              styleMenuItem="w-full"
              styleOptionLabel="text-sm font-normal"
            />

            <form
              onSubmitCapture={handleSubmit(onSubmit)}
              className="flex flex-1"
            >
              <div className="flex-1 px-4">
                <Combobox value={value}>
                  <Controller
                    name="search"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Combobox.Input
                        type={"text"}
                        placeholder={"Tìm kiếm sản phẩm..."}
                        value={value}
                        onChange={(event) => {
                          const value = event.target.value;
                          onChange(value);

                          setValue(value);
                        }}
                        className={
                          "w-full placeholder:font-light placeholder:text-md focus-visible:outline-none truncate"
                        }
                      />
                    )}
                  />
                </Combobox>
              </div>
              <button className="h-full" type="submit">
                <SearchIcon className="h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
        <Link href={"#"} className="lg:hidden block relative">
          <div className="flex items-center cursor-pointer">
            <CartIcon iconClassName="[&>path]:stroke-black [&>circle]:stroke-black" />
          </div>

          {/* {totalItems && totalItems > 0 ? (
          <div className="px-1 py-0 rounded-full bg-red-60 text-white font-bold text-xs absolute right-0 top-0 flex items-center justify-center">
            {totalItems}
          </div>
        ) : (
          <></>
        )} */}
        </Link>

        {/* <div className="lg:hidden block relative" onClick={() => console.log("")}>
        <BellIcon className="cursor-pointer [&>path]:stroke-black lg:hidden block" />
      </div> */}
      </div>
    </>
  );
};
