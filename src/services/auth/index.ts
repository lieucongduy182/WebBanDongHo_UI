import { ForgetPasswordForm } from "@/components/ui/Modal/ModalChildren/ModalForgetPassword/FormForgetPassword";

import axiosClient from "..";
import { LoginFormType, RegisterFormType } from "./type";

export const AuthService = {
  signInWithCredentials: (formData: LoginFormType) =>
    axiosClient.post("/login", formData),

  signUpWithCredentials: (formData: RegisterFormType) =>
    axiosClient.post("/user", formData),

  forgetPassword: (formData: ForgetPasswordForm) =>
    axiosClient.post("/mail/forgot-password", formData),
};
