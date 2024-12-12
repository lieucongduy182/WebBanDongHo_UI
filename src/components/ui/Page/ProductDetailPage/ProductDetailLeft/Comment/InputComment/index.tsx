"use client";

import Image from "next/image";
import { useState } from "react";

import { SendIcon } from "../../../../../../../../public/icons";

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (valueInput: string) => void;
  valueEdit?: string;
}

export const InputComment = (props: Props) => {
  const { handleSubmit, valueEdit = "" } = props;

  const [valueInput, setValueInput] = useState<string>(valueEdit);

  return (
    <div className="flex bg-gray-10 p-4 rounded-lg">
      <div className="w-[40px] h-[40px] cursor-pointer relative">
        <Image
          src={"/images/avatar.png"}
          alt=""
          fill
          className="border-[1px] border-white border-solid rounded-full object-cover object-center"
        />
      </div>
      <div
        className={
          "flex-1 p-2 focus:border-[1px] focus:border-solid focus:border-primary"
        }
      >
        <textarea
          className={
            "inline-block w-full max-h-[300px] overflow-auto text-md text-black resize-none border-none bg-transparent focus:border-none focus:outline-none placeholder:text-gray-60 "
          }
          placeholder="Viết một điều gì đó..."
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />

        <div className="flex justify-end">
          <SendIcon
            className={"[&>path]:fill-primary cursor-pointer"}
            onClick={() => {
              if (!valueInput) return;
              handleSubmit(valueInput);
              setValueInput("");
            }}
          />
        </div>
      </div>
    </div>
  );
};
