import { ReactNode } from "react";

import {
  UserOrderIcon,
  UserOrderSelectedIcon,
  UserSidebarIcon,
  UserSidebarSelectedIcon,
} from "../../public/icons";

export interface DropdownType {
  id: string;
  title: string;
  icon: ReactNode;
  iconSelected: ReactNode;
  link?: string;
}

export interface SidebarType extends DropdownType {
  listDropdown?: Pick<DropdownType, "id" | "title" | "link">[];
}

export const listDataSidebarUser: SidebarType[] = [
  {
    id: "account",
    title: "Tài khoản của tôi",
    icon: <UserSidebarIcon />,
    iconSelected: <UserSidebarSelectedIcon />,
    listDropdown: [
      {
        id: "account-profile",
        title: "Hồ sơ",
        link: "/account/account-profile",
      },

      {
        id: "account-settings",
        title: "Đổi mật khẩu",
        link: "/account/account-settings",
      },
    ],
  },
  {
    id: "orders",
    title: "Đơn mua",
    icon: <UserOrderIcon />,
    iconSelected: <UserOrderSelectedIcon />,
    link: "/account/orders",
  },
];
