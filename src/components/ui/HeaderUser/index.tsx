import { ReactNode } from "react";

import { ChervonDownUserIcon } from "../../../../public/icons";

interface Props {
  title: string;
  subTitle?: string;
  isFilter?: boolean;
  button?: ReactNode;
}
export const HeaderUser = (props: Props) => {
  const { title, subTitle, isFilter = true, button } = props;

  if (!subTitle) {
    return (
      <>
        <div className="flex lg:items-center justify-between lg:flex-row flex-col">
          <p className="font-bold text-2xl">{title}</p>

          {button}

          {isFilter && (
            <div className="flex gap-2 items-center">
              <p className="flex font-bold text-base cursor-pointer">Bộ môn:</p>
              <span className="font-normal text-base"> tất cả</span>

              <div>
                <ChervonDownUserIcon />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl">{title}</p>
        {subTitle && (
          <p className="font-normal text-md text-gray-60">{subTitle}</p>
        )}
      </div>
    </>
  );
};
