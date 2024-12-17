import clsx from "clsx";
import { ReactNode } from "react";

import { Loading } from "../ui/Loading";

interface Props {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: string;
  onClick?: () => void;
  color?: string;
  isLoading?: boolean;
  fontWeight?: string;
  borderColor?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "outlined" | "contained" | "text" | "transparent";
  size?: "medium" | "large";
  className?: string;
  textSize?: string;
  disabled?: boolean;
  transition?: string;
}

export const ButtonCustom = (props: Props) => {
  const {
    title,
    backgroundColor = "bg-gradient-to-r from-slate-800 to-zinc-800",
    textColor = "!text-primary",
    color = "text-white",
    fontWeight = "font-medium",
    borderColor = "",
    textSize = "",
    width = "w-full",
    height = "",
    style = "",
    borderRadius = "rounded-lg",
    size,
    isLoading,
    children,
    onClick,
    variant,
    type = "button",
    className = "",
    disabled,
    transition = "transition-all duration-300 hover:scale-[1.03]",
  } = props;

  const getClassColorNames = () => {
    let classes = "";

    switch (variant) {
      case "contained":
        classes = `${backgroundColor} text-white  active:bg-[#1f4fe099] disabled:bg-blue-20`;
        break;
      case "outlined":
        classes =
          "bg-white text-slate-900 disabled:bg-blue-20 border border-slate-900";
        break;
      case "text":
        classes = `${textColor} bg-transparent `;
        break;
      default:
        break;
    }
    return classes;
  };

  const getSizeClassNames = () => {
    let classes = "";

    switch (size) {
      case "large":
        classes = "px-6 py-4";
        break;
      case "medium":
        classes = "px-6 py-2";
        break;

      default:
        break;
    }
    return classes;
  };

  return (
    <button
      type={type}
      className={clsx(
        width,
        height,
        textSize,
        getClassColorNames() ? getClassColorNames() : `${backgroundColor}`,
        borderRadius,
        borderColor,
        fontWeight,
        color,
        style,
        getSizeClassNames(),
        transition,
        className,
        `${
          disabled
            ? "disabled:opacity-[0.2] rounded-[4px] cursor-not-allowed"
            : ""
        }`,
      )}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Loading isCenter /> : title ? title : children}
    </button>
  );
};
