/* eslint-disable no-unused-vars */
import { Combobox } from "@headlessui/react";
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Controller } from "react-hook-form";

import { ErrorIcon } from "../../../public/icons";

interface Props {
  label?: string;
  name: string;
  defaultValue?: string;
  control: any;
  placeholder?: string;
  errors?: string;
  type?: string;
  backgroundColor?: string;
  borderRadius?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  setValueProps?: Dispatch<SetStateAction<any>>;
  valueProps?: any;
  border?: string;
  padding?: string;
  disabled?: boolean;
  onChangeProps?(
    event: ChangeEvent<HTMLInputElement>,
    onChange: any,
    setValue: Dispatch<any>,
  ): void;
  isIconError?: boolean;
}

export const InputCustom = (props: Props) => {
  const {
    label = "",
    name = "",
    defaultValue = "",
    control,
    placeholder = "",
    errors = "",
    type = "text",
    backgroundColor = "bg-white",
    borderRadius = "rounded-lg",
    prefixIcon = <></>,
    suffixIcon = <></>,
    setValueProps,
    valueProps = "",
    border = "border-[1px] border-solid",
    padding = "p-4",
    onChangeProps,
    isIconError = true,
  } = props;

  const [value, setValue] = useState<any>("");

  return (
    <Combobox value={valueProps || value} disabled={props.disabled}>
      {label && (
        <div className="mb-2">
          <Combobox.Label className={"text-md font-medium"}>
            {label}
          </Combobox.Label>
        </div>
      )}

      <div className="relative w-full">
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <div
                className={`flex items-center gap-2 ${padding} w-full ${border} ${borderRadius} ${backgroundColor} ${
                  errors ? "border-red-60" : "border-gray-10"
                }`}
              >
                {prefixIcon}

                <Combobox.Input
                  type={type}
                  onChange={(event) => {
                    if (onChangeProps) {
                      onChangeProps(event, onChange, setValue);
                      return;
                    }

                    const value = event.target.value;
                    onChange(value);

                    if (setValueProps) {
                      setValueProps(value);
                      return;
                    }

                    setValue(value);
                  }}
                  value={value}
                  placeholder={placeholder}
                  className={` w-full  outline-none ${backgroundColor} `}
                  onBlur={onBlur}
                />

                {suffixIcon}
              </div>
            );
          }}
        />
        {isIconError && errors && errors != "" ? (
          <ErrorIcon
            className="absolute right-2 top-[50%]"
            style={{ transform: "translateY(-50%)" }}
          />
        ) : (
          <></>
        )}
      </div>
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
