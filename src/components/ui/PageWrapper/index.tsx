import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
  style?: string;
}

export const PageWrapper = (props: Props) => {
  const { children, backgroundColor = "", style = "" } = props;

  return (
    <div
      className={`w-full h-full lg:px-[60px] xl:px-[72px] ${backgroundColor} ${style}`}
    >
      <div className="container mx-auto">{children}</div>
    </div>
  );
};
