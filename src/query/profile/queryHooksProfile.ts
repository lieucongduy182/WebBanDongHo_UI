import { profileService } from "@/services/profile";

export const getProfileQueryFn = async (username: string) => {
  const { data } = await profileService.getProfile(username);

  return data;
};
