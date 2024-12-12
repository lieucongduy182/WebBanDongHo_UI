import { UpdateUserType } from "@/app/account/(account)/account-profile/page";

import axiosClient from "..";
import { LoginFormType } from "../auth/type";

export const profileService = {
  getProfile: (username: string) =>
    axiosClient.get(`/user/username/${username}`),
  updateProfile: (formData: UpdateUserType) =>
    axiosClient.put(`/user/${formData.makh}`, formData),
  changePassword: (formData: LoginFormType) =>
    axiosClient.put(`/change-password`, formData),
};
