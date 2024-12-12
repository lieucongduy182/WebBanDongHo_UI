/* eslint-disable no-unused-vars */
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, MouseEventHandler, ReactNode } from "react";

import { OptionSelect } from "@/types/select";

import { CheckIcon } from "../../../public/icons";

interface Props {
  label?: any;
  LabelComponent: (props: { open: boolean }) => JSX.Element;
  selected?: OptionSelect;
  listOptions: OptionSelect[];
  // eslint-disable-next-line no-unused-vars
  onClickItemMenu: (
    option: OptionSelect,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  onClickSelected?: MouseEventHandler<HTMLButtonElement> | undefined;
  styleMenu?: string;
  isCheckIcon?: boolean;
  styleMenuItems?: string;
  styleMenuItem?: string;
  styleWrapperListItem?: string;
  styleOptionLabel?: string;
  contentCustom?: ReactNode;
  urlShareFacebook?: string;
}

export const handleRounded = (index: number, length: number): string => {
  if (length === 1) return "rounded-md";

  if (index === 0) {
    return "rounded-tl-md rounded-tr-md";
  }

  if (index === length - 1) {
    return "rounded-bl-md rounded-br-md";
  }

  return "";
};

export const DropdownCustom = (props: Props) => {
  const {
    LabelComponent = () => null,
    listOptions,
    onClickItemMenu,
    onClickSelected,
    selected,
    styleMenu = "",
    styleMenuItems = "",
    styleMenuItem = "",
    isCheckIcon = true,
    styleOptionLabel = "",
    styleWrapperListItem = "",
    contentCustom,
    urlShareFacebook = "",
  } = props;

  const pathname = usePathname();

  return (
    <Menu as="div" className={`${styleMenu} h-full relative`}>
      {({ open }) => (
        <>
          <Menu.Button
            className={"h-full flex items-center w-full"}
            onClick={onClickSelected}
          >
            <LabelComponent open={open} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              style={{
                zIndex: 8,
              }}
              className={`absolute right-0 top-9 lg:right-[-4px] ${styleMenuItems} origin-top-right rounded-md divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className={`p-0 w-full ${styleWrapperListItem} `}>
                {contentCustom
                  ? contentCustom
                  : listOptions.map((option: OptionSelect, index: number) => (
                      <Menu.Item key={option.value}>
                        {({ active }) =>
                          option.link ? (
                            <Link href={option.link}>
                              {renderContent(active, option, index)}
                            </Link>
                          ) : (
                            renderContent(active, option, index)
                          )
                        }
                      </Menu.Item>
                    ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );

  function renderContent(active: boolean, option: OptionSelect, index: number) {
    return (
      <button
        className={`${
          active || option.value === selected?.value
            ? "bg-[#EDF1FD] text-black"
            : "text-black bg-white"
        } group flex items-center ${handleRounded(
          index,
          listOptions.length,
        )}  px-2 py-2 text-sm ${styleMenuItem}`}
        onClick={(event) => {
          onClickItemMenu(option, event);
        }}
      >
        {option.icon ? (
          <div className="flex items-center gap-2 w-full">
            {option.icon}
            <p className={styleOptionLabel}>{option.label}</p>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <p className={styleOptionLabel}>{option.label}</p>

            {isCheckIcon && option.value === selected?.value && (
              <CheckIcon className="h-4 w-4 stroke-blue-60 stroke-[2px]" />
            )}
          </div>
        )}
      </button>
    );
  }
};
