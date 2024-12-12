import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import {
  ErrorIcon,
  HiddenPasswordIcon,
  ShowPasswordIcon,
} from "../../../public/icons";

interface Props {
  label?: string;
  name: string;
  defaultValue?: string;
  control: any;
  placeholder?: string;
  errors?: string;
  type?: string;
}

export const InputPasswordCustom = (props: Props) => {
  const {
    label = "",
    name = "",
    defaultValue = "",
    control,
    placeholder = "",
    errors = "",
    type = "text",
  } = props;

  const [value, setValue] = useState<any>("");
  const [isShowpassword, setIsShowPassword] = useState<boolean>(false);

  const handleClickIcon = () => {
    setIsShowPassword(!isShowpassword);
  };

  return (
    <Combobox value={value}>
      <div className="mb-2">
        <Combobox.Label className={"text-md font-medium"}>
          {label}
        </Combobox.Label>
      </div>

      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <div
              className={`flex items-center p-4 border-[1px] pr-2 rounded-lg bg-white w-full ${
                errors ? " border-red-60 " : "border-gray-10"
              }`}
            >
              <Combobox.Input
                type={isShowpassword ? type : "password"}
                onChange={(event) => {
                  const value = event.target.value;

                  onChange(value);

                  setValue(value);
                }}
                value={value}
                placeholder={placeholder}
                className={"flex-1 outline-none"}
                style={{
                  width: "calc(100% - 56px)",
                }}
              />

              {isShowpassword ? (
                <ShowPasswordIcon
                  onClick={handleClickIcon}
                  className="cursor-pointer flex-shrink-0"
                />
              ) : (
                <HiddenPasswordIcon
                  onClick={handleClickIcon}
                  className="cursor-pointer flex-shrink-0"
                />
              )}
              {errors && errors != "" ? (
                <ErrorIcon className="ml-2 flex-shrink-0" />
              ) : (
                <></>
              )}
            </div>
          );
        }}
      />
      {errors && errors != "" ? (
        <>
          <p className="text-xs text-red-60 mt-1 mb-2">{errors}</p>
        </>
      ) : (
        <></>
      )}
    </Combobox>
  );
};
