import { ReactNode } from "react";

export interface OptionSelect {
  value: string | number;
  label: string;
  //   handleOnclick?: () => void;
  icon?: ReactNode;
  link?: string;
  color?: string;
  //   id?: string;
  //   code?: string;
  //   sellPrice?: number;
  //   alias?: string;
  //   isHideFilter?: boolean;
}
