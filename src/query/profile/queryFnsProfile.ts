import { useQuery } from "@tanstack/react-query";

import { ProfileType } from "@/types/profile";

import { getProfileQueryFn } from "./queryHooksProfile";
import { QueryKeysProfile } from "./queryKeysProfile";

const initialProfile = {
  makh: "",
  hoTen: "",
  gioiTinh: "",
  sdt: "",
  diaChi: "",
  email: "",
  taikhoan: {
    username: "",
  },
};

export const useQueryGetProfile = (
  username: string,
  // eslint-disable-next-line prettier/prettier
  isAuthenticated: boolean
) =>
  useQuery<ProfileType>({
    queryKey: [QueryKeysProfile.GET_PROFILE, username],
    queryFn: () => getProfileQueryFn(username),
    placeholderData: initialProfile,
    enabled: isAuthenticated,
  });
